/* eslint-disable camelcase */
/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */
import { StatusCodes } from 'http-status-codes';
import app from '../../src/app';
import Service from './index.test';

import { getRandUsers } from '../../src/lib/utils/generateFakeUser';

let createdTestUsers = [];
const endpoint = '/followers';
const userEndpoint = '/users';
class UsersClass extends Service {
  constructor() {
    super(userEndpoint);
  }

  create(user) {
    // eslint-disable-next-line no-underscore-dangle
    return this._testServer.post(this._endpoint).send(user);
  }
}

const Users = new UsersClass();
const Followers = new Service(endpoint);

describe('Follower service, ', () => {
  beforeAll(async () => {
    createdTestUsers = await Promise.all(
      getRandUsers(4).map((u) => {
        const user = u;
        delete user.id;
        return Users.create(user);
      })
    );
  });

  afterAll(async () => {
    await Promise.all(
      createdTestUsers.map(({ body }) =>
        Users.delete(body.id, body.accessToken)
      )
    );
    await app.get('sequelizeClient').close();
  });

  it('The follower service is running', async () => {
    const service = app.service('followers');
    expect(service).toBeDefined();
  });

  it('should start following someone', async () => {
    const requester = createdTestUsers[0].body;
    const user = createdTestUsers[1].body;
    const response = await Followers.create(
      { UserId: user.id },
      requester.accessToken
    );

    expect(response.status).toBe(StatusCodes.CREATED);
    expect(response.body).toEqual(
      expect.objectContaining({
        UserId: user.id,
        FollowerId: requester.id,
        updatedAt: expect.any(String),
        createdAt: expect.any(String),
      })
    );
  });
  it('should stop following someone', async () => {
    const requester = createdTestUsers[2].body;
    const user = createdTestUsers[3].body;

    const response = await Followers.create(
      { UserId: user.id },
      requester.accessToken
    );

    expect(response.status).toBe(StatusCodes.CREATED);
    expect(response.body).toEqual(
      expect.objectContaining({
        UserId: user.id,
        FollowerId: requester.id,
        updatedAt: expect.any(String),
        createdAt: expect.any(String),
      })
    );

    const { User_Follower, User_Following } = app.get('sequelizeClient').models;

    // Ensuring  the follower records was created in the db
    let followerRecords = await User_Follower.findAll({
      where: { UserId: user.id, FollowerId: requester.id },
    });
    expect(
      followerRecords.some(
        (record) =>
          record.UserId === user.id && record.FollowerId === requester.id
      )
    ).toBeTruthy();

    // Ensuring  the following records was created in the db

    let followingRecords = await User_Following.findAll({
      where: { FollowingId: user.id, UserId: requester.id },
    });

    expect(
      followingRecords.some(
        (record) =>
          record.FollowingId === user.id && record.UserId === requester.id
      )
    ).toBeTruthy();

    await Followers.delete(user.id, requester.accessToken);

    // Ensuring the follower records no longer exist in db
    followerRecords = await User_Follower.findAll({
      where: { UserId: user.id, FollowerId: requester.id },
    });
    expect(
      followerRecords.every(
        (record) =>
          record.UserId !== user.id && record.FollowerId !== requester.id
      )
    ).toBeTruthy();

    // Ensuring the following records no longer exist in db

    followingRecords = await User_Following.findAll({
      where: { FollowingId: user.id, UserId: requester.id },
    });
    expect(followingRecords.length).toBe(0);
  });

  it('get the list of all his followers', async () => {
    const user = createdTestUsers[1].body;
    const response = await Followers.getList(
      user.accessToken,
      `action=people-who-follow-me`
    );
    expect(response.status).toBe(StatusCodes.OK);

    response.body.data.forEach((f) => {
      expect(f).toMatchObject({
        id: expect.any(String),
        firstName: expect.any(String),
        lastName: expect.any(String),
        profilePicture: expect.any(String),
      });
    });
  }, 2000);
  it('get a list of all the people he is following', async () => {
    const requester = createdTestUsers[0].body;
    const response = await Followers.getList(
      requester.accessToken,
      `action=people-i-follow`
    );

    expect(response.status).toBe(StatusCodes.OK);
    response.body.data.forEach((f) => {
      expect(f).toMatchObject({
        id: expect.any(String),
        firstName: expect.any(String),
        lastName: expect.any(String),
        profilePicture: expect.any(String),
      });
    });
  });

  it('should get a list of people someone else is following', async () => {
    const peopleWithFollower = createdTestUsers[1].body;
    const user = createdTestUsers[3].body;
    const response = await Followers.getList(
      user.accessToken,
      `action=people-who-follow-me&UserId=${peopleWithFollower.id}`
    );

    expect(response.status).toBe(StatusCodes.OK);
    response.body.data.forEach((follower) => {
      expect(follower).toMatchObject({
        id: expect.any(String),
        firstName: expect.any(String),
        lastName: expect.any(String),
        profilePicture: expect.any(String),
      });
    });
  });
});
