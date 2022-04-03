/* eslint-disable prefer-destructuring */
/* eslint-disable import/no-extraneous-dependencies */
import request from 'supertest';

// custom dependencies
import app from '../../app';
import db from '../../models';

const baseUrl = '/api/reaction';

describe('/api/reaction', () => {
  let expressServer = null;
  let newUser = null;
  let token = null;
  let thePost = null;
  let comment = null;
  let theCommentReaction = null;
  let reaction = null;

  const commentMsg = 'some comment for the post';
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

    const postResponse = await request(expressServer)
      .post('/api/post')
      .set('x-auth-token', token)
      .send({ postText: `Post with Reaction`, UserId: newUser.id });

    thePost = postResponse.body.data.post;

    const commentResponse = await request(expressServer)
      .post('/api/comment')
      .set('x-auth-token', token)
      .send({
        postText: commentMsg,
        UserId: newUser.id,
        PostId: thePost.id,
      });

    comment = commentResponse.body.data.comment;
  }, 30000);

  it('should create a reaction for on a post', async () => {
    const reactionResponse = await request(expressServer)
      .post(baseUrl)
      .send({
        PostId: thePost.id,
        UserId: newUser.id,
        content: 'like',
      })
      .set('x-auth-token', token);

    const { post } = reactionResponse.body.data;

    expect(post).toBeDefined();
    expect(post.Reactions).toBeDefined();
    expect(post.Reactions.length).toBe(1);
    expect(post.Reactions[0].content).toEqual('like');
    expect(post.Reactions[0].PostId).toEqual(thePost.id);
  });
  it('should create a reaction on a comment', async () => {
    const reactionResponse = await request(expressServer)
      .post(baseUrl)
      .send({
        PostId: comment.id,
        UserId: newUser.id,
        content: 'love',
      })
      .set('x-auth-token', token);

    const { post } = reactionResponse.body.data;
    theCommentReaction = post.Comments[0].Reactions[0];
    expect(post).toBeDefined();
    expect(post.Comments).toBeDefined();
    expect(post.Comments.length).toEqual(1);
    expect(post.Comments[0].Reactions).toBeDefined();
    expect(post.Comments[0].Reactions.length).toEqual(1);
    expect(theCommentReaction.content).toEqual('love');
    expect(theCommentReaction.PostId).toEqual(comment.id);
    expect(theCommentReaction.User.id).toEqual(newUser.id);
  });
  it('should get a reaction by id', async () => {
    const reactionResponse = await request(expressServer)
      .get(`${baseUrl}/${theCommentReaction.id}`)
      .set('x-auth-token', token);
    reaction = reactionResponse.body.data.reaction;

    expect(reaction.PostId).toBe(comment.id);
    expect(reaction).toEqual(expect.objectContaining(theCommentReaction));
  });

  it('should modify a reaction from a post', async () => {
    const editedReactionResponse = await request(expressServer)
      .put(`${baseUrl}/${reaction.id}`)
      .send({ content: 'dislike' })
      .set('x-auth-token', token);

    const editedReaction = editedReactionResponse.body.data.reaction;

    expect(
      editedReaction.PostId === reaction.PostId &&
        editedReaction.id === reaction.id &&
        editedReaction.User.id === reaction.User.id &&
        editedReaction.content !== reaction.content
    ).toBeTruthy();
    expect(editedReaction.content).toEqual('dislike');
  });
  it('should delete a reaction from a post', async () => {
    const deleteReactionResponse = await request(expressServer)
      .delete(`${baseUrl}/${reaction.id}`)
      .set('x-auth-token', token);

    const deletedReact = deleteReactionResponse.body.data.reaction;
    expect(deletedReact).toEqual(expect.objectContaining({ id: reaction.id }));

    const retrievingReactionResponse = await request(expressServer)
      .get(`${baseUrl}/${reaction.id}`)
      .set('x-auth-token', token);

    expect(retrievingReactionResponse.statusCode).toBe(404);

    const reDeleteReactionResponse = await await request(expressServer)
      .delete(`${baseUrl}/${reaction.id}`)
      .set('x-auth-token', token);

    expect(reDeleteReactionResponse.statusCode).toBe(404);
  });
});
