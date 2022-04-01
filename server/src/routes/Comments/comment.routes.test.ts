/* eslint-disable import/no-extraneous-dependencies */
import request from 'supertest';

/** Local dependencies */
import app from '../../app';
import db from '../../models';

describe('api/comment', () => {
  let post = null;
  let comment = null;
  let expressServer = null;
  let newUser = null;
  let token = null;
  const postText = `I am the comment 1 on  post 1 `;
  beforeAll(async () => {
    expressServer = await app(db);
    // crete a user and Login server

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

    // create  a post.
    const postResponse = await request(expressServer)
      .post('/api/post')
      .set('x-auth-token', token)
      .send({ postText: 'I am a new post', UserId: newUser.id });

    post = postResponse.body.data.post;
  }, 10000);
  it('should create a comment', async () => {
    const commentResponse = await request(expressServer)
      .post('/api/comment')
      .set('x-auth-token', token)
      .send({
        postText,
        UserId: newUser.id,
        PostId: post.id,
      });

    comment = commentResponse.body.data.comment;
    expect(comment).toEqual(
      expect.objectContaining({
        postText,
        UserId: newUser.id,
        PostId: post.id,
        id: expect.any(Number),
      })
    );
  }, 1000);
  it('should get a comment by its id', async () => {
    const aboveComment = await request(expressServer)
      .get(`/api/comment/${comment.id}`)
      .set('x-auth-token', token);
    expect(aboveComment.body.data.comment.PostId).toEqual(comment.PostId);
  });
  it('should get a comment by the UserId', async () => {
    const commentByUserId = await request(expressServer)
      .get(`/api/comment?UserId=${newUser.id}`)
      .set('x-auth-token', token);
    expect(
      commentByUserId.body.data.comment.some(
        (anyComment) =>
          anyComment.PostId === comment.PostId &&
          anyComment.id === comment.id &&
          anyComment.postText === comment.postText
      )
    ).toBeTruthy();
  });
  it('should get a comment by the PostId', async () => {
    const commentByUserId = await request(expressServer)
      .get(`/api/comment?PostId=${post.id}`)
      .set('x-auth-token', token);
    expect(
      commentByUserId.body.data.comment.some(
        (anyComment) =>
          anyComment.PostId === comment.PostId &&
          anyComment.id === comment.id &&
          anyComment.postText === comment.postText
      )
    ).toBeTruthy();
  });
  it('should edit a comment', async () => {
    const editedCommentResponse = await request(expressServer)
      .put(`/api/comment/${comment.id}`)
      .set('x-auth-token', token)
      .send({ postText: 'I changed my mine I am a new comment' });

    const editedComment = editedCommentResponse.body.data.comment;

    expect(
      editedComment.id === comment.id &&
        editedComment.PostId === comment.PostId &&
        editedComment.postText !== comment.postText
    ).toBeTruthy();
  });
  it('should delete a comment', async () => {
    const deletedCommentResponse = await request(expressServer)
      .delete(`/api/comment/${comment.id}`)
      .set('x-auth-token', token);

    const deletedComment = deletedCommentResponse.body.data.comment;

    const tryingToRetrieveDeletedComment = await request(expressServer)
      .get(`/api/comment/${comment.id}`)
      .set('x-auth-token', token);

    expect(deletedComment === comment.id).toBeTruthy();
    expect(tryingToRetrieveDeletedComment.statusCode).toBe(404);
  });

  describe('api/comment testing the bad requests', () => {
    it('should not create a comment if not login or without a valid token', async () => {
      const commentResponse = await request(expressServer)
        .post('/api/comment')
        .send({
          postText,
          UserId: newUser.id,
          PostId: post.id,
        });

      expect(commentResponse.body.errors[0].message).toBe(
        'Missing Authentication token'
      );
      expect(commentResponse.statusCode).toBe(400);
    });
    it('should not create a comment if the post Id or UserId is not provided', async () => {
      [
        {
          postText,
          UserId: newUser.id,
        },
        {
          postText,
          PostId: post.id,
        },
      ].forEach(async (commentRequest) => {
        const commentResponse = await request(expressServer)
          .post('/api/comment')
          .set('x-auth-token', token)
          .send(commentRequest);
        expect(commentResponse.statusCode).toBe(400);
      });
    });
  });
});
