/* eslint-disable import/no-extraneous-dependencies */
import request from 'supertest';

// custom dependencies
import app from '../../app';
import db from '../../models';

describe('/api/post', () => {
  let expressServer = null;
  let newUser = null;
  let token = null;
  let thePost = null;
  beforeAll(async () => {
    expressServer = await app(db);
    const response = await request(expressServer)
      .post('/api/user')
      .send({
        firstName: 'John',
        lastName: 'franc',
        email: `john${Math.random()}@example.com`,
        password: 'bigPassword123',
        passwordConfirmation: 'bigPassword123',
      });

    newUser = response.body.data.user;
    token = response.body.data.token;
  }, 30000);

  it('should not create a post ', async () => {
    [
      {
        postText: ' I am a post text',
      },
    ].forEach(async (requestData) => {
      const response = await request(expressServer)
        .post('/api/post')
        .send(requestData);
      expect(response.statusCode).toBe(400);
      expect(response.body.data).toBeUndefined();
      expect(response.body.errors).toBeDefined();
    });
  });
  it('should create a new post', async () => {
    const response = await request(expressServer)
      .post('/api/post')
      .set('x-auth-token', token)
      .send({ postText: `I am a new post # 1`, UserId: newUser.id });

    thePost = response.body.data.post;
    expect(response.statusCode).toBe(201);
    expect(thePost).toBeDefined();
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
  });

  it('should retrieve a post by its id', async () => {
    const samePostResponse = await request(expressServer)
      .get(`/api/post/${thePost.id}`)
      .set('x-auth-token', token);

    const samePost = await samePostResponse.body.data.post;
    expect(samePost.id).toEqual(thePost.id);
    expect(samePost.postText).toEqual(thePost.postText);
    expect(samePost.Comments).toBeDefined();
    expect(Array.isArray(samePost.Comments)).toBeTruthy();
    expect(samePostResponse.statusCode).toBe(200);
  });

  it('should retrieve all post by userId', async () => {
    const page = 0;
    const size = 5;
    const allPostResponse = await request(expressServer)
      .get(`/api/post?UserId=${newUser.id}&size=${size}&page=${page}`)
      .set('x-auth-token', token);

    const allPost = allPostResponse.body.data.posts;
    expect(Array.isArray(allPost)).toBeTruthy();
    expect(allPost.length).toBeLessThanOrEqual(size);
    expect(allPost.every((post) => post.User.id === newUser.id)).toBeTruthy();
  });
  it('should create comment for a post', async () => {
    const commentResponse = await request(expressServer)
      .post('/api/comment')
      .set('x-auth-token', token)
      .send({
        postText: 'some message for my comment',
        UserId: newUser.id,
        PostId: thePost.id,
      });
    expect(commentResponse.statusCode);
  });

  it('should have at least one comment', async () => {
    const samePostResponse = await request(expressServer)
      .get(`/api/post/${thePost.id}`)
      .set('x-auth-token', token);

    const samePost = await samePostResponse.body.data.post;
    const firstComment = samePost.Comments[0];

    expect(samePost.id).toEqual(thePost.id);
    expect(samePost.postText).toEqual(thePost.postText);
    expect(samePost.Comments).toBeDefined();
    expect(Array.isArray(samePost.Comments)).toBeTruthy();
    expect(samePost.Comments.length).toBe(1);
    expect(
      firstComment.PostId === thePost.id &&
        firstComment.postText === 'some message for my comment'
    ).toBeTruthy();
    expect(firstComment.User).toBeDefined();
    expect(firstComment.User.id === newUser.id).toBeTruthy();
    expect(firstComment.User.profilePicture).toBeDefined();
  });
  it.todo('should create a new post with Picture');

  it('should edit a post', async () => {
    const editedPostResponse = await request(expressServer)
      .put(`/api/post/${thePost.id}`)
      .set('x-auth-token', token)
      .send({
        postText: 'I am a new string do yo like me',
      });

    const editedLPost = editedPostResponse.body.data.post;
    expect(editedLPost.id).toEqual(thePost.id);
    expect(editedLPost.postText).toEqual('I am a new string do yo like me');
    expect(editedLPost.UserId).toEqual(thePost.UserId);
  });
  it('should delete a post with all its comment', async () => {
    const deletedPostResponse = await request(expressServer)
      .delete(`/api/post/${thePost.id}`)
      .set('x-auth-token', token);

    const deletedPost = deletedPostResponse.body.data.post;
    // todo test the comment were also removed
    const retrievePostResponse = await request(expressServer)
      .get(`/api/post/${thePost.id}`)
      .set('x-auth-token', token);

    expect(deletedPost.id).toEqual(thePost.id);
    expect(deletedPost.postText).toBeUndefined();
    expect(retrievePostResponse.statusCode).toBe(404);
  }, 2000);
  describe('/api/post testing bad request', () => {
    it('should not create a post if not logged in', async () => {
      const response = await request(expressServer)
        .post('/api/post')
        .send({ postText: 'I am a new post', UserId: newUser.id });

      expect(response.statusCode).toBe(400);
      expect(response.body.errors[0].message).toEqual(
        expect.stringContaining('Missing')
      );
    });
  });
});
