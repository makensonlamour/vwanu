/* eslint-disable import/no-extraneous-dependencies */
import request from 'supertest';
import app from '../../src/app';
import {
  getRandUsers,
  getRandUser,
} from '../../src/lib/utils/generateFakeUser';

const userEndpoint = '/users';
const postEndpoint = '/posts';
const endpoint = '/timeline';
let observer;
let aFriend;
const createPost = (server, postObject: any, accessToken) =>
  server
    .post(postEndpoint)
    .send(postObject)
    .set('Authorization', `Bearer ${accessToken}`);

const createUser = (server, userObject: any) => {
  const user = userObject;
  delete user?.id;
  return server.post(userEndpoint).send(userObject);
};

describe("'timeline ' service", () => {
  let testServer;
  let createdTestUser;

  beforeAll(async () => {
    testServer = request(app);
    await app.get('sequelizeClient').sync({ force: true });
    createdTestUser = await Promise.all(
      getRandUsers(4).map((user) => createUser(testServer, user))
    );
    observer = await createUser(testServer, getRandUser());
    observer = observer.body;
    // 4 Public posts
    await Promise.all(
      createdTestUser.map(({ body }) =>
        createPost(
          testServer,
          { postText: ` I am a post from ${body.firstName}` },
          body.accessToken
        )
      )
    );
  }, 10000);
  it('registered the service', () => {
    const service = app.service('timeline');
    expect(service).toBeTruthy();
  });

  it('Should receive 4 public posts', async () => {
    const { body: timeline } = await testServer
      .get(endpoint)
      .set('authorization', observer.accessToken);
    expect(timeline.data).toHaveLength(4);

    createdTestUser.forEach((u) => {
      const post = timeline.data.find((p) =>
        p.postText.includes(u.body.firstName)
      );
      expect(post.privacyType).toEqual('public');
      expect(post).toBeDefined();
    });

    // despite a private post was a created it is not being pulled
    expect(timeline.data.every((t) => t.privacyType === 'public')).toBeTruthy();
  });

  it('should create a private post and not be pulled by unfriend User', async () => {
    const privatePost = await createPost(
      testServer,
      {
        postText: 'I am a private post',
        privacyType: 'private',
      },
      createdTestUser[0].body.accessToken
    );
    expect(privatePost.statusCode).toBe(201);

    const { body: timeline } = await testServer
      .get(endpoint)
      .set('authorization', observer.accessToken);

    expect(timeline.data).toHaveLength(4);
    expect(
      timeline.data.find((p) => p.postText === privatePost.postText)
    ).toBeUndefined();
  });

  it('should see 5 post ', async () => {
    const { body: timeline } = await testServer
      .get(endpoint)
      .set('authorization', createdTestUser[0].body.accessToken);

    expect(timeline.data).toHaveLength(5);
  });

  it('friend should still see 4 post as well', async () => {
    const { User_friends: friends } = app.get('sequelizeClient').models;
    aFriend = await createUser(testServer, getRandUser());
    aFriend = aFriend.body;
    await Promise.all([
      friends.create({
        UserId: aFriend.id,
        friendId: createdTestUser[0].body.id,
      }),
      friends.create({
        friendId: aFriend.id,
        UserId: createdTestUser[0].body.id,
      }),
    ]);

    const { body: timeline } = await testServer
      .get(endpoint)
      .set('authorization', aFriend.accessToken);

    expect(timeline.data).toHaveLength(4);
    expect(true).toBeTruthy();
  });

  it("should create a ' Friends type' post user see 6 observer 4 and friend 5", async () => {
    const friendsTypePost = await createPost(
      testServer,
      {
        postText: 'I am a friends type post',
        privacyType: 'friends',
      },
      createdTestUser[0].body.accessToken
    );
    expect(friendsTypePost.statusCode).toBe(201);

    const { body: observerTimeline } = await testServer
      .get(endpoint)
      .set('authorization', observer.accessToken);

    expect(observerTimeline.data).toHaveLength(4);

    const { body: aFriendTimeline } = await testServer
      .get(endpoint)
      .set('authorization', aFriend.accessToken);
    expect(aFriendTimeline.data).toHaveLength(5);

    const { body: userTimeline } = await testServer
      .get(endpoint)
      .set('authorization', createdTestUser[0].body.accessToken);
    expect(userTimeline.data).toHaveLength(6);
  });
});
