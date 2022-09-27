/* eslint-disable import/no-extraneous-dependencies */
import request from 'supertest';
import { StatusCodes } from 'http-status-codes';
// custom dependencies
import app from '../../src/app';
import { getRandUsers } from '../../src/lib/utils/generateFakeUser';

// export const createPost = (testServer) => {};
describe('Posts services', () => {
  let testServer;
  let observer;
  let observerToken;
  let postMaker;
  let postMakerToken;
  let thePost;
  let commenter;
  let commenterToken;
  const endpoint = '/posts';
  const userEndpoint = '/users';
  beforeAll(async () => {
    await app.get('sequelizeClient').sync({ logged: false, force: true });
    testServer = request(app);

    let testUsers = await Promise.all(
      getRandUsers(4).map((u) => {
        const user = u;
        delete user.id;
        return testServer.post(userEndpoint).send(user);
      })
    );

    testUsers = testUsers.map((r) => r.body);
    [observer, postMaker, commenter] = testUsers;

    observerToken = observer.accessToken;
    postMakerToken = postMaker.accessToken;
    commenterToken = commenter.accessToken;
  }, 30000);

  it('should not create a post ', async () => {
    const badPosts = [
      {
        pos: ' I am a post text',
      },
    ];

    const responses = await Promise.all(
      badPosts.map((post) =>
        testServer.post(endpoint).send(post).set('authorization', observerToken)
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
    const { statusCode, body: response } = await testServer
      .post(endpoint)
      .send({ postText: `I am a new post # 1` })
      .set('authorization', postMakerToken);

    thePost = response;

    expect(statusCode).toBe(StatusCodes.CREATED);
  });
  it('should get one post', async () => {
    const { body: post } = await testServer
      .get(endpoint)
      .set('authorization', observerToken);

    expect(post.data).toHaveLength(1);
  });

  it('should retrieve a post by its id', async () => {
    const retrievedPost = await testServer
      .get(`${endpoint}/${thePost.id}`)
      .set('authorization', observerToken);
    const samePost = retrievedPost.body;
    expect(samePost.id).toEqual(thePost.id);
    expect(samePost.postText).toEqual(thePost.postText);
    expect(retrievedPost.statusCode).toBe(StatusCodes.OK);
  }, 3000);

  it('should create comment for a post', async () => {
    const { statusCode: commentResponse } = await testServer
      .post(endpoint)
      .set('authorization', commenterToken)
      .send({
        postText: 'some message for my comment',
        PostId: thePost.id,
      });
    expect(commentResponse).toBe(StatusCodes.CREATED);
  }, 3000);

  it('should find one post with one comment', () => {
    testServer
      .get(endpoint)
      .set('authorization', observerToken)
      .expect(StatusCodes.OK)
      .then(({ body: { data } }) => {
        expect(data).toHaveLength(1);
        expect(data[0].amountOfComments).toBe(1);
      });
  });
  it('should find the post and have one comment', async () => {
    const { body: foundPostWithComment } = await testServer
      .get(`${endpoint}/${thePost.id}`)
      .set('authorization', observerToken);

    expect(foundPostWithComment.amountOfComments).toEqual(1);
  });
  it('should react on the post', async () => {
    const { statusCode: reactionResponse } = await testServer
      .post('/reactions')
      .set('authorization', commenterToken)
      .send({
        content: 'like',
        entityId: thePost.id,
        entityType: 'Post',
      });
    expect(reactionResponse).toBe(StatusCodes.CREATED);
  });
  it('should find one post with one comment,one reaction, and he is the reactor', () => {
    testServer
      .get(endpoint)
      .set('authorization', commenterToken)
      .expect(StatusCodes.OK)
      .then(({ body: { data } }) => {
        expect(data).toHaveLength(1);
        expect(data[0].amountOfComments).toBe(1);
        expect(data[0].amountOfReactions).toBe(1);
        expect(data[0].isReactor).toHaveLength(1);
      });
  });

  it('should find one post with one comment,one reaction, and he is not the reactor', () => {
    testServer
      .get(endpoint)
      .set('authorization', observerToken)
      .expect(StatusCodes.OK)
      .then(({ body: { data } }) => {
        expect(data).toHaveLength(1);
        expect(data[0].amountOfComments).toBe(1);
        expect(data[0].amountOfReactions).toBe(1);
        expect(data[0].isReactor).toBe(null);
      });
  });

  it('should find all comments on a post', async () => {
    const { body: foundComments } = await testServer
      .get(`${endpoint}?PostId=${thePost.id}`)
      .set('authorization', observerToken);

    expect(foundComments.data).toHaveLength(1);
  });

  it('should retrieve all post by userId', async () => {
    const {
      body: { data: observerPosts },
    } = await testServer
      .get(`${endpoint}?UserId=${observer.id}`)
      .set('authorization', `Bearer ${observerToken}`);

    expect(observerPosts).toHaveLength(0);

    const {
      body: { data: postMakerPosts },
    } = await testServer
      .get(`${endpoint}?UserId=${postMaker.id}`)
      .set('authorization', `Bearer ${observerToken}`);

    expect(postMakerPosts).toHaveLength(1);

    const {
      body: { data: commenterPosts },
    } = await testServer
      .get(`${endpoint}?UserId=${commenter.id}`)
      .set('authorization', `Bearer ${observerToken}`);

    expect(commenterPosts).toHaveLength(0);
  }, 3000);

  it('should not edit a post', async () => {
    const { statusCode: editAttemptStatus } = await testServer
      .patch(`${endpoint}/${thePost.id}`)
      .set('authorization', observerToken)
      .send({
        postText: 'I am a new string do yo like me',
      });

    expect(editAttemptStatus).toEqual(StatusCodes.BAD_REQUEST);
  }, 3000);

  it('should edit a post', async () => {
    const { body: editedLPost } = await testServer
      .patch(`${endpoint}/${thePost.id}`)
      .set('authorization', postMakerToken)
      .send({
        postText: 'I am a new string do yo like me',
      });

    expect(editedLPost.id).toEqual(thePost.id);
    expect(editedLPost.postText).toEqual('I am a new string do yo like me');
    expect(editedLPost.UserId).toEqual(thePost.UserId);
  }, 3000);

  it('should lock post', async () => {
    const { body: lockedPost } = await testServer
      .patch(`${endpoint}/${thePost.id}`)
      .send({ locked: true })
      .set('authorization', postMakerToken);
    expect(lockedPost.locked).toBe(true);
  });

  it('Cannot comment on a locked Post', async () => {
    const commentAttempt = await testServer
      .post(endpoint)
      .send({
        postText: 'Commenting on a locked discussion',
        PostId: thePost.id,
      })
      .set('authorization', postMakerToken);

    expect(commentAttempt.statusCode).toBe(400);
  });

  it('should not delete a post', async () => {
    const { statusCode: editAttemptStatus } = await testServer
      .delete(`${endpoint}/${thePost.id}`)
      .set('authorization', observerToken);

    expect(editAttemptStatus).toEqual(StatusCodes.BAD_REQUEST);
  }, 3000);
  it('should delete a post with all its comment', async () => {
    const deletedPostResponse = await testServer
      .delete(`${endpoint}/${thePost.id}`)
      .set('authorization', postMakerToken);

    const deletedPost = deletedPostResponse.body;
    expect(deletedPost.id).toEqual(thePost.id);

    const retrievePostResponse = await testServer
      .get(`${endpoint}/${thePost.id}`)
      .set('authorization', observerToken);

    expect(retrievePostResponse.statusCode).toBe(StatusCodes.NOT_FOUND);
  }, 3000);
});
