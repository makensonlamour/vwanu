/* eslint-disable camelcase */
/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */
import { StatusCodes } from 'http-status-codes';
import request from 'supertest';
import app from '../../src/app';

import { getRandUsers } from '../../src/lib/utils/generateFakeUser';

const endpoint = '/users';
/* #region  Global variables Main */

const modify = { country: 'United States', gender: 'f' };
let createdTestUsers = [];

const expectedUser = {
  id: expect.any(String),
  email: expect.any(String),
  gender: expect.any(String),
  admin: expect.any(Boolean),
  online: expect.any(Boolean),
  active: expect.any(Boolean),
  language: expect.any(String),
  lastName: expect.any(String),
  lastSeen: expect.any(String),
  verified: expect.any(Boolean),
  firstName: expect.any(String),
  createdAt: expect.any(String),
  updatedAt: expect.any(String),
  coverPicture: expect.any(Object),
  profilePicture: expect.any(Object),
  lastSeenPrivacy: expect.any(Boolean),
};
/* #endregion */

describe('/users service', () => {
  let testServer;
  beforeAll(async () => {
    const sq = app.get('sequelizeClient');
    const { User } = sq.models;
    await User.sync({ force: true });
    await sq.sync({ logged: false, force: true });
    testServer = request(app);
  }, 20000);

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
    ].forEach(async (requestData) => {
      const response = await testServer
        .post(endpoint)
        .send(requestData)
        .set('accept', 'application/json');

      expect(response.statusCode).toBe(StatusCodes.BAD_REQUEST);
      expect(response.body.errors).toBeDefined();
    });
  }, 10000);

  it('Should create and autoLog 4 users', async () => {
    const usersR = getRandUsers(4).map((u) => {
      const user = u;
      delete user.id;
      return testServer.post(endpoint).send(user);
    });

    const responses = await Promise.all(usersR);
    createdTestUsers = responses.map((response) => ({
      user: response.body,
      token: response.body.accessToken,
    }));

    responses.forEach((res) => {
      expect(res.body).toMatchObject(expectedUser);
      expect(res.body.id).toBeDefined();
      expect(res.body.password).toBeUndefined();
      expect(res.statusCode).toBe(201);
      expect(res.header['content-type']).toEqual(
        expect.stringContaining('application/json')
      );
    });
  }, 20000);

  it.skip('should return all users', async () => {
    const users = await testServer
      .get(`${endpoint}`)
      .set('authorization', `Bearer ${createdTestUsers[0].token}`);

    // console.log(users.body.data.length > createdTestUsers.length);
    createdTestUsers.forEach((createdUser) => {
      expect(
        users.body.data.some((user) => user.id === createdUser?.user.id)
      ).toBeTruthy();
    });
  }, 1000);

  it('should get a user by id ', async () => {
    const requester = createdTestUsers[0];
    const profileRequesting = createdTestUsers[1]?.user;

    const userR = await testServer
      .get(`${endpoint}/${profileRequesting.id}`)
      .set('authorization', requester.token);

    expect(userR.body.id).toEqual(profileRequesting.id);
    expect(userR.body.email).toEqual(profileRequesting.email);
  });

  it('should not update sensitive information', async () => {
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

  it('should not modify a different user', async () => {
    const requester = createdTestUsers[0];
    const res = await testServer
      .patch(`${endpoint}/${createdTestUsers[1]?.user.id}`)
      .send(modify)
      .set('authorization', requester.token);
    expect(res.statusCode).toEqual(400);
  });

  it('should update the user details', async () => {
    const requester = createdTestUsers[0];
    const res = await testServer
      .patch(`${endpoint}/${requester?.user.id}`)
      .send(modify)
      .set('authorization', requester.token);
    expect(res.body.birthday).toBeDefined();
    expect(res.body).toEqual(expect.objectContaining(modify));
  });

  it('The user should now be updated with the fields above ', async () => {
    const userR = await testServer
      .get(`${endpoint}/${createdTestUsers[0].user.id}`)
      .set('authorization', createdTestUsers[0].token);
    expect(userR.body).toEqual(expect.objectContaining(modify));
  });

  it('should not delete another user profile', async () => {
    const response = await testServer
      .delete(`${endpoint}/${createdTestUsers[0]?.user.id}`)
      .set('authorization', createdTestUsers[1].token);
    expect(response.statusCode).toEqual(400);
  });

  it('should delete his own profile', async () => {
    const requester = createdTestUsers[0];
    const deletedUser = await testServer
      .delete(`${endpoint}/${requester?.user.id}`)
      .set('authorization', requester.token);
    expect(requester?.user.id).toEqual(deletedUser.body.id);
    expect(deletedUser.statusCode).toEqual(200);
  });
});
