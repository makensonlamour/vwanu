/* eslint-disable camelcase */
/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */

import { StatusCodes } from 'http-status-codes';
import request from 'supertest';
import app from '../../app';

import { getRandUsers } from '../../lib/utils/generateFakeUser';

const endpoint = '/friends';
const userEndpoint = '/users';
const friendRequestEndpoint = '/friendRequest';
let createdTestUsers = [];
let Friends = [];
let User;
let notFriend;
describe('friend service', () => {
  let testServer;
  beforeAll(async () => {
    await app.get('sequelizeClient').sync({ logged: false, force: true });
    testServer = request(app);
    // create the users
    createdTestUsers = await Promise.all(
      getRandUsers(5).map((u) => {
        const user = u;
        delete user.id;
        return testServer.post(userEndpoint).send(user);
      })
    );

    // create friend request
    User = createdTestUsers.shift();
    notFriend = createdTestUsers.shift();

    await Promise.all(
      createdTestUsers.map(({ body }) =>
        testServer
          .post(friendRequestEndpoint)
          .send({ UserID: User.body.id })
          .set('authorization', body.accessToken)
      )
    );
    // Accept all friend request
    Friends = await Promise.all(
      createdTestUsers.map(async ({ body }) =>
        testServer
          .post(endpoint)
          .send({ friendId: body.id, accept: true })
          .set('authorization', User.body.accessToken)
      )
    );
  }, 30000);

  it('should see all his friends', async () => {
    const myFriendsR = await testServer
      .get(endpoint)
      .set('authorization', User.body.accessToken);

    console.log(myFriendsR.body);
    expect(myFriendsR.status).toEqual(StatusCodes.OK);
    expect(Array.isArray(myFriendsR.body.data)).toBe(true);
    expect(myFriendsR.body.data).toHaveLength(Friends.length);

    expect(
      myFriendsR.body.data.every((user) => user.id === notFriend.body.id)
    ).toBe(false);
  });

  it('User should Remove someone as friend', async () => {
    const toUnfriend = Friends[0].body;

    const res = await testServer
      .delete(`${endpoint}/?friendId=${toUnfriend.id}`)
      .set('authorization', User.body.accessToken);

    expect(res.body).toEqual(
      expect.objectContaining({
        id: toUnfriend.id,
        lastName: toUnfriend.lastName,
        firstName: toUnfriend.firstName,
        updatedAt: expect.any(String),
        profilePicture: toUnfriend.profilePicture,
      })
    );

    const deleteUser = res.body;
    delete deleteUser.updatedAt;
    expect(toUnfriend).toMatchObject(deleteUser);

    const myFriendsR = await testServer
      .get(endpoint)
      .set('authorization', User.body.accessToken);

    myFriendsR.body.data.forEach((friend) => {
      expect(Friends.some((user) => user.body.id === friend.id)).toBe(true);
    });

    expect(
      myFriendsR.body.data.every((user) => user.id === toUnfriend.id)
    ).toBe(false);
  });
  it('Requester should remove someone as friend', async () => {
    const toUnfriend = User.body;
    const requester = createdTestUsers[2].body;

    const res = await testServer
      .delete(`${endpoint}/?friendId=${toUnfriend.id}`)
      .set('authorization', requester.accessToken);

    expect(res.body).toEqual(
      expect.objectContaining({
        id: toUnfriend.id,
        lastName: toUnfriend.lastName,
        firstName: toUnfriend.firstName,
        updatedAt: expect.any(String),
        profilePicture: toUnfriend.profilePicture,
      })
    );

    const deleteUser = res.body;
    delete deleteUser.updatedAt;
    expect(toUnfriend).toMatchObject(deleteUser);

    const myFriendsR = await testServer
      .get(endpoint)
      .set('authorization', requester.accessToken);

    myFriendsR.body.data.forEach((friend) => {
      if (friend.id !== requester.id)
        expect(Friends.some((user) => user.body.id === friend.id)).toBe(true);
    });
  });
  it.todo('should not be able to see someone as friends if not a friend');
  // it.skip('should create a friend request', async () => {
  //   const reqester = createdTestUsers[0].body;
  //   const friend = createdTestUsers[1].body;

  //   const response = await testServer
  //     .post(endpoint)
  //     .send({
  //       UserId: createdTestUsers[1].body.id,
  //     })
  //     .set('authorization', createdTestUsers[0].body.accessToken);

  //   expect(response.status).toBe(StatusCodes.CREATED);
  // });

  // it.skip('should not create a friend request twice', async () => {
  //   const requester = createdTestUsers[0].body;
  //   const friend = createdTestUsers[1].body;

  //   const response = await testServer
  //     .post(endpoint)
  //     .send({
  //       UserId: friend.id,
  //     })
  //     .set('authorization', requester.accessToken);

  //   expect(response.status).toBe(StatusCodes.BAD_REQUEST);
  // });
  // it.skip('should not create a friend request if one already exist', async () => {
  //   const requester = createdTestUsers[0].body;
  //   const friend = createdTestUsers[1].body;

  //   const response = await testServer
  //     .post(endpoint)
  //     .send({
  //       UserId: requester.id,
  //     })
  //     .set('authorization', friend.accessToken);

  //   expect(response.status).toBe(StatusCodes.BAD_REQUEST);
  // });
  // it.skip('should cancel a friend request', () => {});
  // it.todo('should deny a friend request');
  // it.todo('should not be able to send a friend request');
  // it.todo('should accept a friend request');
  // it.todo('should return all your friends ');
  // it.todo('should return all friend request you sent');
  // it.todo('should return all friend request your received');
});
