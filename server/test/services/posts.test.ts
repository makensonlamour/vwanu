/* eslint-disable import/no-extraneous-dependencies */
import request from 'supertest';
import { StatusCodes } from 'http-status-codes';
// custom dependencies
import app from '../../src/app';
import { getRandUsers } from '../../src/lib/utils/generateFakeUser';

// export const createPost = (testServer) => {};
describe('Posts services', () => {
  let testServer;
  let newUser;
  let token;
  let thePost;
  const postMade = 1;
  const endpoint = '/posts';
  const userEndpoint = '/users';
  beforeAll(async () => {
    await app.get('sequelizeClient').sync({ logged: false, force: true });
    testServer = request(app);

    const responses = await Promise.all(
      getRandUsers(4).map((u) => {
        const user = u;
        delete user.id;
        return testServer.post(userEndpoint).send(user);
      })
    );

    newUser = responses[0].body;
    token = responses[0].body.accessToken;
  }, 30000);

  it('should not create a post ', async () => {
    const badPosts = [
      {
        pos: ' I am a post text',
      },
    ];

    const responses = await Promise.all(
      badPosts.map((post) =>
        testServer.post(endpoint).send(post).set('authorization', token)
      )
    );

    responses.forEach(async (response) => {
      expect(response.statusCode).toBe(StatusCodes.BAD_REQUEST);
      expect(response.body).toMatchObject({
        name: 'BadRequest',
        message: 'Invalid Parameters',
        code: 400,
        className: 'bad-request',
        data: expect.any(Object),
        errors: expect.any(Array),
      });
    });
  }, 3000);
  it('should create a new post', async () => {
    const response = await testServer
      .post(endpoint)
      .send({ postText: `I am a new post # 1` })
      .set('authorization', token);

    thePost = response.body;

    expect(response.statusCode).toBe(StatusCodes.CREATED);
    expect(thePost).toEqual(
      expect.objectContaining({
        postText: expect.any(String),
        id: expect.any(String),
        privacyType: 'public',
        UserId: newUser.id,
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      })
    );
    expect(response.header['content-type']).toEqual(
      expect.stringContaining('application/json')
    );
  }, 3000);

  it('should retrieve a post by its id', async () => {
    const samePostResponse = await testServer
      .get(`${endpoint}/${thePost.id}`)
      .set('authorization', token);

    const samePost = samePostResponse.body;
    expect(samePost.id).toEqual(thePost.id);
    expect(samePost.postText).toEqual(thePost.postText);
    expect(samePost.Comments).toBeDefined();
    expect(Array.isArray(samePost.Comments)).toBeTruthy();
    expect(samePostResponse.statusCode).toBe(StatusCodes.OK);
  }, 3000);

  it('should retrieve all post by userId', async () => {
    const allPostResponse = await testServer
      .get(`${endpoint}?UserId=${newUser.id}`)
      .set('authorization', `Bearer ${token}`);
    const allPost = allPostResponse.body;
    expect(allPostResponse.status).toBe(StatusCodes.OK);

    expect(allPost.data.length).toBeLessThanOrEqual(postMade);
  });
  it('should create comment for a post', async () => {
    const commentResponse = await testServer
      .post('/comments')
      .set('authorization', token)
      .send({
        postText: 'some message for my comment',
        UserId: newUser.id,
        PostId: thePost.id,
      });

    expect(commentResponse.statusCode);
  }, 3000);

  it('should have at least one comment', async () => {
    const samePostResponse = await testServer
      .get(`${endpoint}/${thePost.id}`)
      .set('authorization', token);

    const samePost = samePostResponse.body;
    const firstComment = samePost.Comments[0];

    expect(samePost.id).toEqual(thePost.id);
    expect(samePost.postText).toEqual(thePost.postText);
    expect(samePost.Comments).toBeDefined();
    expect(samePost.Comments.length).toBe(1);

    expect(firstComment.User).toBeDefined();
    expect(firstComment.User.id === newUser.id).toBeTruthy();
    expect(firstComment.User.profilePicture).toBeDefined();
  }, 3000);

  it('should edit a post', async () => {
    const editedPostResponse = await testServer
      .patch(`${endpoint}/${thePost.id}`)
      .set('authorization', token)
      .send({
        postText: 'I am a new string do yo like me',
      });

    const editedLPost = editedPostResponse.body;
    expect(editedLPost.id).toEqual(thePost.id);
    expect(editedLPost.postText).toEqual('I am a new string do yo like me');
    expect(editedLPost.UserId).toEqual(thePost.UserId);
  }, 3000);
  it('should delete a post with all its comment', async () => {
    const deletedPostResponse = await testServer
      .delete(`${endpoint}/${thePost.id}`)
      .set('authorization', token);

    const deletedPost = deletedPostResponse.body;
    expect(deletedPost.id).toEqual(thePost.id);

    const retrievePostResponse = await testServer
      .get(`${endpoint}/${thePost.id}`)
      .set('authorization', token);

    expect(retrievePostResponse.statusCode).toBe(StatusCodes.NOT_FOUND);
  }, 3000);
});
