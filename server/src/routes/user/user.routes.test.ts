/* eslint-disable camelcase */
/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */

import request from 'supertest';
import { StatusCodes } from 'http-status-codes';
import { Op } from '@sequelize/core';

// Custom dependencies
import app from '../../app';
import db from '../../models';

/* #region  Global variables Main */
let userFromDB;
let activationKey;
const goodUser = {
  password: 'goodPassword',
  email: 'test@example.com',
  firstName: 'John',
  lastName: 'Doe',
  passwordConfirmation: 'goodPassword',
};

const badTestUser = [
  { password: 'goodPassword' },
  { email: 'goodPassword' },
  { email: 'notEmail', password: 'goodPassword' },
  { password: 'badPassword', email: 'rt@example.com' },
];
const testUsers = [
  { ...goodUser },
  { ...goodUser, email: 'bn@gh.com' },
  { ...goodUser, email: 'someEmail@hotmail.com' },
  { ...goodUser, email: 'someEmail@gmail.com' },
];
const modify = { country: 'United States', gender: 'f' };
let createdTestUsers = [];

const expectedUser = {
  id: expect.any(Number),
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
  coverPicture: expect.any(String),
  profilePicture: expect.any(String),
  lastSeenPrivacy: expect.any(Boolean),
};
/* #endregion */

// Testing the user routes //

describe('/api/user', () => {
  let expressServer: any = null;
  let testServer;
  beforeAll(async () => {
    expressServer = await app(db);
    testServer = request(expressServer);
    db.sequelize.options.logging = false;
  });

  it('Should not create user if request params are not ', async () => {
    badTestUser.forEach(async (requestData) => {
      const response = await testServer.post('/api/user').send(requestData);

      expect(response.statusCode).toBe(StatusCodes.BAD_REQUEST);
      expect(response.body.data).toBeUndefined();
      expect(response.body.errors).toBeDefined();
    });
  }, 10000);

  it('Given correct email and password it should return a user and a token', async () => {
    const users = testUsers.map((user) =>
      testServer.post('/api/user').send(user)
    );
    const responses = await Promise.all(users);
    createdTestUsers = responses.map((response) => ({
      user: response.body.data.user,
      token: response.body.data.token,
    }));
    responses.forEach((res) => {
      expect(res.body.data.user).toBeDefined();
      expect(res.body.data.user.id).toBeDefined();
      expect(res.body.data.user.password).toBeUndefined();
      expect(res.body.data.token).toEqual(expect.any(String));
      expect(res.statusCode).toBe(201);
      expect(res.header['content-type']).toEqual(
        expect.stringContaining('application/json')
      );
    });
  }, 30000);

  it('should get his own profile', async () => {
    const requester = createdTestUsers[0];
    const selfR = await testServer
      .get('/api/user')
      .set('x-auth-token', requester.token);

    expect(selfR.body.data.user.id).toEqual(requester.user.id);
    expect(selfR.body.data.user.email).toEqual(requester.user.email);
    expect(selfR.body.data.user.password).toBeUndefined();
    expect(selfR.body.data.user).toEqual(expect.objectContaining(expectedUser));
  });

  it('should get a user by id ', async () => {
    const requester = createdTestUsers[0];
    const profileRequesting = createdTestUsers[1].user;

    const userR = await testServer
      .get(`/api/user/${profileRequesting.id}`)
      .set('x-auth-token', requester.token);
    expect(userR.body.data.user).toBeDefined();
    expect(userR.body.data.user.id).toEqual(profileRequesting.id);
    expect(userR.body.data.user.email).toEqual(profileRequesting.email);
  });
  it('should not be able to reset his password if not verified', async () => {
    const resetpassword = await testServer
      .post('/api/user/forgotPassword')
      .send({ email: createdTestUsers[0].user.email })
      .set('x-auth-token', createdTestUsers[0].token);

    expect(resetpassword.statusCode).toBe(400);
    expect(resetpassword.body.errors).toBeDefined();
    expect(resetpassword.body.data).toBeUndefined();
  }, 10000);

  it('should not verify user when wrong activationKey is given', async () => {
    userFromDB = await db.User.findOne({
      where: { id: createdTestUsers[0].user.id },
    });
    activationKey = userFromDB.activationKey;
    expect(userFromDB.verified).toBe(false);

    const verifyResponse = await testServer
      .post(
        `/api/user/verify/${createdTestUsers[0].user.id}/${activationKey + 1}`
      )
      .set('x-auth-token', createdTestUsers[0].token);
    expect(verifyResponse.statusCode).toBe(400);
    expect(verifyResponse.body.data).toBeUndefined();
    expect(verifyResponse.body.errors).toBeDefined();
    expect(verifyResponse.header['content-type']).toEqual(
      expect.stringContaining('application/json')
    );
  }, 10000);

  it('should be able to verify and existing user with correct id and activation key', async () => {
    expect(userFromDB.verified).toBeDefined();
    expect(userFromDB.verified).toBe(false);

    const verifyResponse = await testServer
      .post(`/api/user/verify/${createdTestUsers[0].user.id}/${activationKey}`)
      .set('x-auth-token', createdTestUsers[0].token);
    expect(verifyResponse.statusCode).toBe(200);
    expect(verifyResponse.body.data.user).toBeDefined();
    expect(verifyResponse.body.data.user.verified).toBe(true);
    expect(verifyResponse.header['content-type']).toEqual(
      expect.stringContaining('application/json')
    );

    const dbRecords = await db.User.findOne({
      where: { id: createdTestUsers[0].user.id },
    });
    expect(dbRecords.activationKey).toBeNull();
  }, 10000);

  it('should not verify user when user is already verified', async () => {
    const verifyResponse = await testServer
      .post(`/api/user/verify/${createdTestUsers[0].user.id}/${activationKey}`)
      .set('x-auth-token', createdTestUsers[0].token);
    expect(verifyResponse.statusCode).toBe(400);
    expect(verifyResponse.body.data).toBeUndefined();
    expect(verifyResponse.body.errors).toBeDefined();
  }, 10000);

  it('should be able to send reset password request after verification', async () => {
    const resetpassword = await testServer
      .post('/api/user/forgotPassword')
      .send({ email: createdTestUsers[0].user.email });
    expect(resetpassword.statusCode).toBe(200);
    expect(resetpassword.body.data).toBeDefined();
    expect(resetpassword.body.errors).toBeUndefined();
  }, 10000);

  it('should not reset password if missing any information', async () => {
    const badResetPasswordRequest = [
      { password: 'goodPassword' },
      { passwordConfirmation: 'goodPassword' },
      { password: 'goodPassword' },
      { password: 'goodPassword', passwordConfirmation: '4' },
      { password: '4', passwordConfirmation: '4' },
    ];
    const { id } = createdTestUsers[0].user;
    const dbRecords = await db.User.findOne({
      where: { id },
    });
    const { resetPasswordKey } = dbRecords;
    expect(resetPasswordKey).toBeDefined();
    expect(resetPasswordKey.length > 0).toBe(true);
    badResetPasswordRequest.forEach(async (body) => {
      const resetPasswordResponse = await testServer
        .post(`/api/user/resetPassword/${id}/${resetPasswordKey}`)
        .send(body);
      expect(resetPasswordResponse.statusCode).toBe(400);
    });
  }, 10000);

  it('should be able to sign in ', async () => {
    const auth = await testServer.post('/api/auth').send({ ...goodUser });
    expect(auth.status).toBe(StatusCodes.ACCEPTED);
    expect(auth.body.data.token).toBeDefined();
    expect(auth.body.data.user).toBeDefined();
  });

  it('should be able to reset a password after request', async () => {
    const { id } = createdTestUsers[0].user;
    const dbRecords = await db.User.findOne({
      where: { id },
    });
    const { resetPasswordKey } = dbRecords;
    expect(resetPasswordKey).toBeDefined();
    expect(resetPasswordKey.length > 0).toBe(true);

    const resetPasswordResponse = await testServer
      .post(`/api/user/resetPassword/${id}/${resetPasswordKey}`)
      .send({ password: 'newPassword', passwordConfirmation: 'newPassword' });

    expect(resetPasswordResponse.statusCode).toBe(200);
    expect(resetPasswordResponse.body.data.user).toBeDefined();
    expect(resetPasswordResponse.body.errors).toBeUndefined();

    const dbRecordsVerified = await db.User.findOne({
      where: { id },
    });
    expect(dbRecords.password !== dbRecordsVerified.password).toBe(true);
    expect(dbRecordsVerified.resetPasswordKey).toBeNull();
  }, 15000);

  it('should be able to sign in with the new password set', async () => {
    const auth = await testServer
      .post('/api/auth')
      .send({ email: createdTestUsers[0].user.email, password: 'newPassword' });

    expect(auth.status).toBe(StatusCodes.ACCEPTED);
    expect(auth.body.data.token).toBeDefined();
  });

  it('should not update the user', async () => {
    [
      { password: 'password' },
      { activationKey: 'activationKey' },
      { resetPasswordKey: 'resetPasswordKey' },
    ].forEach(async (unacceptable) => {
      const res = await testServer
        .put(`/api/user/${createdTestUsers[0].user.id}`)
        .send(unacceptable);
      expect(res.statusCode).toEqual(400);
    });
  });
  it('should update the user details', async () => {
    const res = await testServer
      .put(`/api/user/${createdTestUsers[0].user.id}`)
      .send(modify);
    expect(res.body.data.user.birthday).toBeDefined();
    expect(res.body.data.user).toBeDefined();
    expect(res.body.data.user).toEqual(expect.objectContaining(modify));
  });

  it('The user should now be updated with the fields above ', async () => {
    const userR = await testServer
      .get('/api/user/')
      .set('x-auth-token', createdTestUsers[0].token);
    expect(userR.body.data.user).toEqual(expect.objectContaining(modify));
  });

  it('User 1 Attempt to be friend with user 2 should fail', async () => {
    const friendsResponse = await testServer
      .post(
        `/api/user/friend/${createdTestUsers[0].user.id}/${createdTestUsers[1].user.id}?action=add-friend`
      )
      .set('x-auth-token', createdTestUsers[0].token);
    expect(friendsResponse.body.errors[0]).toEqual(
      expect.objectContaining({
        status: 400,
        message: expect.any(String),
      })
    );
  });

  it('should send a friend request', async () => {
    await testServer
      .post(
        `/api/user/request/${createdTestUsers[0].user.id}/${createdTestUsers[1].user.id}?action=add-friend`
      )
      .set('x-auth-token', createdTestUsers[0].token);

    const users = await db.User.findAll({
      where: {
        id: {
          [Op.or]: [createdTestUsers[1].user.id, createdTestUsers[0].user.id],
        },
      },
      attributes: ['id', 'lastName', 'firstName'],
    });

    const friend = users.find(
      (user) => user.id === createdTestUsers[1].user.id
    );

    const requester = users.find(
      (user) => user.id === createdTestUsers[0].user.id
    );
    const receivedRequest = await friend.hasFriendsRequest(requester);
    expect(receivedRequest).toBe(true);
  });

  it('Should now become friends', async () => {
    const friendsResponse = await testServer
      .post(
        `/api/user/friend/${createdTestUsers[1].user.id}/${createdTestUsers[0].user.id}?action=add-friend`
      )
      .set('x-auth-token', createdTestUsers[1].token);
    const { user } = friendsResponse.body.data;
    expect(user.friends).toBeDefined();
    expect(
      user.friends.some((req) => req.id === createdTestUsers[0].user.id)
    ).toBeTruthy();
  });

  it('should follow the user', async () => {
    const followResponse = await testServer
      .post(
        `/api/user/follow/${createdTestUsers[2].user.id}/${createdTestUsers[3].user.id}?action=follow`
      )
      .set('x-auth-token', createdTestUsers[2].token);
    const people = await db.User.findAll({
      where: {
        id: {
          [Op.or]: [createdTestUsers[2].user.id, createdTestUsers[3].user.id],
        },
      },
    });

    const requester = people.find(
      (person) => person.id === createdTestUsers[2].user.id
    );

    const receiver = people.find(
      (person) => person.id === createdTestUsers[3].user.id
    );

    const hasFollower = await receiver.hasFollower(requester);

    const { user } = followResponse.body.data;
    expect(user.Following).toBeDefined();
    expect(hasFollower).toBeTruthy();
    expect(
      user.Following.some((req) => req.id === createdTestUsers[3].user.id)
    );
  });

  it('Timeline should return post for user and his friends', async () => {
    /** #region creating posts for user 1 and user 2 */
    const responses = [createdTestUsers[0], createdTestUsers[1]].map(
      async (userToken) =>
        testServer
          .post('/api/post')
          .set('x-auth-token', userToken.token)
          .send({
            postText: `I am a post made by user ${userToken.user.email}`,
            UserId: userToken.user.id,
          })
    );

    await Promise.all(responses);

    const user_1_timeline = await testServer
      .get('/api/user/timeline')
      .set('x-auth-token', createdTestUsers[0].token);

    const timeLinePost = user_1_timeline.body.data.posts;
    console.log('\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n My post n\n\n\n\n\nn');
    console.log(timeLinePost);
    /** expecting to find user 1 and user 2 post in user1 timeline */
    expect(
      timeLinePost.some(
        (post) =>
          post.postText ===
          `I am a post made by user ${createdTestUsers[1].user.email}`
      )
    ).toBeTruthy();

    expect(
      timeLinePost.some(
        (post) =>
          post.postText ===
          `I am a post made by user ${createdTestUsers[0].user.email}`
      )
    ).toBeTruthy();
  }, 1000);
});
