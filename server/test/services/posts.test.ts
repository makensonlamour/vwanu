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
    await app.get('sequelizeClient').sync({  logged: false });
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
        id: expect.any(Number),
        privacyType: 'public',
        UserId: newUser.id,
        audioCount: 0,
        createdAt: expect.any(String),
        imageCount: 0,
        multiAudio: false,
        multiImage: false,
        multiVideo: false,
        updatedAt: expect.any(String),
        videoCount: 0,
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
    // console.log('\n\n\n The comment on the post');
    // console.log(samePost.Comments);
    expect(samePost.id).toEqual(thePost.id);
    expect(samePost.postText).toEqual(thePost.postText);
    expect(samePost.Comments).toBeDefined();
    expect(Array.isArray(samePost.Comments)).toBeTruthy();
    expect(samePostResponse.statusCode).toBe(StatusCodes.OK);
  }, 3000);

  it('should retrieve all post by userId', async () => {
    // const page = 0;
    // const size = 5;
    const allPostResponse = await testServer
      .get(`${endpoint}?UserId=${newUser.id}`)
      .set('authorization', `Bearer ${token}`);

    // console.log('All post made');
    // console.log(allPostResponse.body);
    const allPost = allPostResponse.body;
    expect(allPostResponse.status).toBe(StatusCodes.OK);

    expect(allPost.length).toBeLessThanOrEqual(postMade);
    // // expect(allPost.every((post) => post.User.id === newUser.id)).toBeTruthy();
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

    // console.log(samePostResponse.body);
    const samePost = samePostResponse.body;
    const firstComment = samePost.Comments[0];
    // console.log('\n\n\nfirstComment');
    // console.log(firstComment);
    expect(samePost.id).toEqual(thePost.id);
    expect(samePost.postText).toEqual(thePost.postText);
    expect(samePost.Comments).toBeDefined();
    // expect(Array.isArray(samePost.Comments)).toBeTruthy();
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
    // todo test the comment were also removed
    const retrievePostResponse = await testServer
      .get(`${endpoint}/${thePost.id}`)
      .set('authorization', token);

    expect(retrievePostResponse.statusCode).toBe(StatusCodes.NOT_FOUND);
  }, 3000);
});
