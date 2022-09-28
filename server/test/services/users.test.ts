/* eslint-disable camelcase */
/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */
import { StatusCodes } from 'http-status-codes';
import request from 'supertest';
import app from '../../src/app';

import {
  getRandUsers,
  getRandUser,
} from '../../src/lib/utils/generateFakeUser';

const createdTestUsers = [];
let observer;
let privateUser;
const endpoint = '/users';

const modify = { country: 'United States', gender: 'f' };

describe('/users service', () => {
  let testServer;
  const interests = ['sport', 'education'];
  beforeAll(async () => {
    await app.get('sequelizeClient').sync({ logged: false, force: true });
    testServer = request(app);
  });

  it('The user service is running', async () => {
    const service = app.service('users');
    expect(service).toBeDefined();
  });
  it('Should not create user', async () => {
    [
      { password: 'goodPassword' },
      { email: 'goodPassword' },
      { email: 'notEmail', password: 'goodPassword' },
      { password: 'badPassword', email: 'rt@example.com' },
    ].map(async (requestData) => {
      const response = await testServer.post(endpoint).send(requestData);

      expect(response.statusCode).toBe(StatusCodes.BAD_REQUEST);
      expect(response.body.errors).toBeDefined();
    });
  }, 10000);

  it('Should create and autoLog 4 users', async () => {
    const responses = await Promise.all(
      getRandUsers(4).map((u) => {
        const user = u;
        delete user.id;
        return testServer.post(endpoint).send(user);
      })
    );

    responses.forEach((res) => {
      expect(res.body.id).toBeDefined();
      expect(res.body.password).toBeUndefined();
      expect(res.statusCode).toBe(201);
    });
  }, 20000);

  it('should create user and associate them with their interest', async () => {
    const responses = await Promise.all(
      getRandUsers(4).map((u) => {
        const user = u;
        delete user.id;
        return testServer.post(endpoint).send({ ...user, interests });
      })
    );

    responses.forEach((res) => {
      expect(res.statusCode).toBe(201);
    });
  });
  it('should return all 9 users', async () => {
    const u = getRandUser();
    const user = u;
    delete user.id;
    observer = await testServer.post(endpoint).send(user);

    const {
      body: { data: users },
    } = await testServer
      .get(endpoint)
      .set('authorization', `${observer.body.accessToken}`);

    expect(users).toHaveLength(9);
  }, 1000);

  it('should create a user with a private profile', async () => {
    const u = getRandUser();
    const user = u;
    delete user.id;
    const response = await testServer
      .post(endpoint)
      .send({ ...user, profilePrivacy: 'private' });
    privateUser = response.body;
    expect(response.statusCode).toBe(201);
  });
  it('should still return  9 users', async () => {
    const {
      body: { data: users },
    } = await testServer
      .get(endpoint)
      .set('authorization', `${observer.body.accessToken}`);

    expect(users).toHaveLength(9);
  }, 1000);

  it('should  return  10 users', async () => {
    const {
      body: { data: users },
    } = await testServer
      .get(endpoint)
      .set('authorization', `${privateUser.accessToken}`);

    expect(users).toHaveLength(10);
  }, 1000);

  it('should only find online users ', async () => {
    const {
      body: { data: users },
    } = await testServer
      .get(`${endpoint}?online=true`)
      .set('authorization', `${observer.body.accessToken}`);

    expect(users).toHaveLength(0);

    // Creating 4 online users with
    const responses = await Promise.all(
      getRandUsers(4).map((u) => {
        const user = { ...u, online: true };
        delete user.id;
        return testServer.post(endpoint).send(user);
      })
    );

    responses.forEach(({ statusCode }) => {
      expect(statusCode).toBe(201);
    });

    const {
      body: { data: onlineUsers },
    } = await testServer
      .get(`${endpoint}?online=true`)
      .set('authorization', `${observer.body.accessToken}`);

    expect(onlineUsers).toHaveLength(4);
  });
  it('should only find online users witch are friends and mark as friends', async () => {
    const {
      body: { data: users },
    } = await testServer
      .get(`${endpoint}?online=true&friends=true`)
      .set('authorization', `${observer.body.accessToken}`);

    expect(users).toHaveLength(0);

    // Creating 4 future friend for the observer
    const responses = await Promise.all(
      getRandUsers(4).map((u) => {
        const user = { ...u, online: true };
        delete user.id;
        return testServer.post(endpoint).send(user);
      })
    );

    responses.forEach(({ statusCode }) => {
      expect(statusCode).toBe(201);
    });

    // Make theme friends with the observer
    const { User_friends: friends } = app.get('sequelizeClient').models;
    await Promise.all(
      responses.map(({ body }) =>
        friends.create({ UserId: body.id, friendId: observer.body.id })
      )
    );

    const {
      body: { data: onlineUsers },
    } = await testServer
      .get(`${endpoint}?online=true&friends=true`)
      .set('authorization', `${observer.body.accessToken}`);

    // console.log(onlineUsers[0]);
    onlineUsers.forEach((user) => {
      expect(user.isFriend).toBe(true);
    });
    expect(onlineUsers).toHaveLength(4);
  });

  it('should get a user by id ', async () => {
    const requester = observer.body;
    const user = getRandUser();
    delete user.id;
    const { body: profileRequesting } = await testServer
      .post(endpoint)
      .send(user);

    const { body: userR } = await testServer
      .get(`${endpoint}/${profileRequesting.id}`)
      .set('authorization', requester.accessToken);

    console.log('One user');
    console.log(userR);
    expect(userR.id).toEqual(profileRequesting.id);
    expect(userR.email).toEqual(profileRequesting.email);
    expect(userR.address).toHaveLength(0);
  });
  it.skip('should not update sensitive information', async () => {
    const requester = createdTestUsers[0];
    [
      { password: 'password' },
      { activationKey: 'activationKey' },
      { resetPasswordKey: 'resetPasswordKey' },
    ].forEach(async (unacceptable) => {
      const res = await testServer
        .patch(`${endpoint}/${requester?.user.id}`)
        .send(unacceptable)
        .set('authorization', requester.token);
      expect(res.statusCode).toEqual(400);
    });
  });

  it.skip('should not modify a different user', async () => {
    const requester = createdTestUsers[0];
    const res = await testServer
      .patch(`${endpoint}/${createdTestUsers[1]?.user.id}`)
      .send(modify)
      .set('authorization', requester.token);
    expect(res.statusCode).toEqual(400);
  });

  it.skip('should update the user details', async () => {
    const requester = createdTestUsers[0];
    const res = await testServer
      .patch(`${endpoint}/${requester?.user.id}`)
      .send(modify)
      .set('authorization', requester.token);
    expect(res.body.birthday).toBeDefined();
    expect(res.body).toEqual(expect.objectContaining(modify));
  });

  it.skip('The user should now be updated with the fields above ', async () => {
    const userR = await testServer
      .get(`${endpoint}/${createdTestUsers[0].user.id}`)
      .set('authorization', createdTestUsers[0].token);
    expect(userR.body).toEqual(expect.objectContaining(modify));
  });

  it.skip('should not delete another user profile', async () => {
    const response = await testServer
      .delete(`${endpoint}/${createdTestUsers[0]?.user.id}`)
      .set('authorization', createdTestUsers[1].token);
    expect(response.statusCode).toEqual(400);
  });

  it.skip('should delete his own profile', async () => {
    const requester = createdTestUsers[0];
    const deletedUser = await testServer
      .delete(`${endpoint}/${requester?.user.id}`)
      .set('authorization', requester.token);
    expect(requester?.user.id).toEqual(deletedUser.body.id);
    expect(deletedUser.statusCode).toEqual(200);
  });
});
