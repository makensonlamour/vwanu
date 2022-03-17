/* eslint-disable camelcase */
/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */
import axios from 'axios';
import config from 'config';
import ChanceJS from 'chance';
import request from 'supertest';

// Custom dependencies
import app from '../../app';
import db from '../../models';

// Module  globals
const badPassword = '2';
const goodPassword = 'password';
const email = 'test@example.com';

const firstName = 'John';
const lastName = 'Doe';

const goodUser = {
  password: goodPassword,
  email,
  firstName,
  lastName,
  passwordConfirmation: goodPassword,
};

// Testing the user routes //

describe('/api/user', () => {
  let expressServer: any = null;
  beforeAll(async () => {
    expressServer = await app(db);
  });

  it('Given correct email and password it should return a user and a token', async () => {
    const response = await request(expressServer)
      .post('/api/user')
      .send(goodUser);
    console.log('Where is the goddam issue ');
    console.log(response.body);
    expect(response.body.data.user).toBeDefined();
    expect(response.body.data.user.id).toBeDefined();
    expect(response.body.data.user.password).toBeUndefined();
    expect(response.body.data.token).toBeDefined();
    expect(typeof response.body.data.token).toBe('string');
    expect(response.statusCode).toBe(201);
    expect(response.header['content-type']).toEqual(
      expect.stringContaining('application/json')
    );
  }, 10000);

  it('Should not create user if request params are not correctly formatted ', async () => {
    [
      { password: goodPassword },
      { email: goodPassword },
      { email: 'notEmail', password: goodPassword },
      { password: badPassword, email },
    ].forEach(async (requestData) => {
      const response = await request(expressServer)
        .post('/api/user')
        .send(requestData);

      expect(response.statusCode).toBe(400);
      expect(response.body.data).toBeUndefined();
      expect(response.body.errors).toBeDefined();
    });
  }, 10000);
});

// We are sure we can create a user we are testing the users other details //
describe('/api/user *after user creation*. ', () => {
  const chance = new ChanceJS();
  let expressServer = null;
  let newlyCreatedUser = null;
  let response = null;
  let userFromDB = null;
  let activationKey = null;

  let userEmail = null;
  let testmailURL = null;
  let startTimestamp = null;
  let TAG = null;

  beforeAll(async () => {
    const NAMESPACE = config.get('TEST_MAIL_NAMESPACE');
    const API_KEY = config.get('TEST_MAIL_API_KEY');

    TAG = chance.string({
      length: 12,
      pool: 'abcdefghijklmnopqrstuvwxyz0123456789',
    });
    startTimestamp = Date.now();
    userEmail = `${NAMESPACE}.${TAG}@inbox.testmail.app`;
    testmailURL = `https://api.testmail.app/api/json?apikey=${API_KEY}&namespace=${NAMESPACE}`;
    expressServer = await app(db);
    response = await request(expressServer)
      .post('/api/user')
      .send({ ...goodUser, email: userEmail });
    newlyCreatedUser = response.body.data.user;
    userFromDB = await db.User.findOne({
      where: { id: newlyCreatedUser.id },
    });
    activationKey = userFromDB.activationKey;
  }, 30000);

  it('should not be able to reset his password if not verified', async () => {
    const resetpassword = await request(expressServer)
      .post('/api/user/forgotPassword')
      .send({ email: newlyCreatedUser.email });

    expect(resetpassword.statusCode).toBe(400);
    expect(resetpassword.body.errors).toBeDefined();
    expect(resetpassword.body.data).toBeUndefined();
  }, 10000);

  it('should not verify user when wrong activationKey is given', async () => {
    expect(userFromDB.verified).toBeDefined();
    expect(userFromDB.verified).toBe(false);
    const verifyResponse = await request(expressServer).post(
      `/api/user/verify/${newlyCreatedUser.id}/${activationKey + 1}`
    );
    expect(verifyResponse.statusCode).toBe(400);
    expect(verifyResponse.body.data).toBeUndefined();
    expect(verifyResponse.body.errors).toBeDefined();
    expect(response.header['content-type']).toEqual(
      expect.stringContaining('application/json')
    );
  }, 10000);
  it('should be able to verify and existing user with correct id and activation key', async () => {
    expect(userFromDB.verified).toBeDefined();
    expect(userFromDB.verified).toBe(false);

    const verifyResponse = await request(expressServer).post(
      `/api/user/verify/${newlyCreatedUser.id}/${activationKey}`
    );

    expect(verifyResponse.statusCode).toBe(200);
    expect(verifyResponse.body.data.user).toBeDefined();
    expect(verifyResponse.body.data.user.verified).toBe(true);
    expect(response.header['content-type']).toEqual(
      expect.stringContaining('application/json')
    );

    const dbRecords = await db.User.findOne({
      where: { id: newlyCreatedUser.id },
    });
    expect(dbRecords.activationKey).toBeNull();
  }, 10000);

  it('should not verify user when user is already verified', async () => {
    const verifyResponse = await request(expressServer).post(
      `/api/user/verify/${newlyCreatedUser.id}/${activationKey}`
    );
    expect(verifyResponse.statusCode).toBe(400);
    expect(verifyResponse.body.data).toBeUndefined();
    expect(verifyResponse.body.errors).toBeDefined();
  }, 10000);
  it('should be able to send reset password request after verification', async () => {
    const resetpassword = await request(expressServer)
      .post('/api/user/forgotPassword')
      .send({ email: newlyCreatedUser.email });
    expect(resetpassword.statusCode).toBe(200);
    expect(resetpassword.body.data).toBeDefined();
    expect(resetpassword.body.errors).toBeUndefined();
  }, 10000);

  it('should not reset password if missing any information', async () => {
    const badResetPasswordRequest = [
      { password: goodPassword },
      { passwordConfirmation: goodPassword },
      { password: goodPassword },
      { password: goodPassword, passwordConfirmation: badPassword },
      { password: badPassword, passwordConfirmation: badPassword },
    ];
    const { id } = newlyCreatedUser;
    const dbRecords = await db.User.findOne({
      where: { id },
    });
    const { resetPasswordKey } = dbRecords;
    expect(resetPasswordKey).toBeDefined();
    expect(resetPasswordKey.length > 0).toBe(true);
    badResetPasswordRequest.forEach(async (body) => {
      const resetPasswordResponse = await request(expressServer)
        .post(`/api/user/resetPassword/${id}/${resetPasswordKey}`)
        .send(body);

      expect(resetPasswordResponse.statusCode).toBe(400);
    });
  }, 10000);
  it('should be able to reset a password after request', async () => {
    const { id } = newlyCreatedUser;
    const dbRecords = await db.User.findOne({
      where: { id },
    });
    const { resetPasswordKey } = dbRecords;
    expect(resetPasswordKey).toBeDefined();
    expect(resetPasswordKey.length > 0).toBe(true);

    const resetPasswordResponse = await request(expressServer)
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
  }, 10000);

  it.skip('should send an email to the user email address', (done) => {
    const endpoint = `${testmailURL}&tag=${TAG}&timestamp_from=${startTimestamp}&livequery=true`;
    const partOfLink = `verify`;
    axios
      .get(endpoint)
      .then((res) => {
        const inbox = res.data;
        expect(inbox.result).toEqual('success');
        expect(inbox.emails[0].html).toEqual(
          expect.stringContaining(partOfLink)
        );
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});
