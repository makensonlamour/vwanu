/* eslint-disable import/no-extraneous-dependencies */
import request from 'supertest';

// Custom dependencies
import app from '../../app';
import db from '../../models';

// Module  globals to

// Default user
const badPassword = '2';
const goodPassword = 'password';
const email = 'test@example.com';
const badUser = { password: badPassword, email };
const goodUser = { password: goodPassword, email };

// Testing the user routes

describe('/api/user', () => {
  let expressServer: any = null;
  beforeAll(async () => {
    expressServer = await app(db);
    jest.setTimeout(9000);
  });

  it('Given correct email and password it should return a user and a token', async () => {
    const response = await request(expressServer)
      .post('/api/user')
      .send(goodUser);
    expect(response.body.data.user).toBeDefined();
    expect(response.body.data.user.id).toBeDefined();
    expect(response.body.data.user.password).toBeUndefined();
    expect(response.body.data.token).toBeDefined();
    expect(typeof response.body.data.token).toBe('string');
    expect(response.statusCode).toBe(201);
    expect(response.header['content-type']).toEqual(
      expect.stringContaining('application/json')
    );
  });

  it('should create the user ,if the password is missing ', async () => {
    const response = await request(expressServer)
      .post('/api/user')
      .send({ email });
    expect(response.statusCode).toBe(400);
    expect(response.body.data).toBeUndefined();
    expect(response.body.errors).toBeDefined();
  });
  it('should not create user if password is not long enough', async () => {
    const response = await request(expressServer)
      .post('/api/user')
      .send({ email, badPassword });
    expect(response.statusCode).toBe(400);
    expect(response.body.data).toBeUndefined();
    expect(response.body.errors).toBeDefined();
  });

  it('Should fail is email is missing ', async () => {
    const response = await request(expressServer)
      .post('/api/user')
      .send({ password: 'somme-password' });
    expect(response.statusCode).toBe(400);
    expect(response.body.data).toBeUndefined();
    expect(response.body.errors).toBeDefined();
  });
  it('should fail given wrongly formatted email and password', async () => {
    const response = await request(expressServer)
      .post('/api/user')
      .send(badUser);
    expect(response.statusCode).toBe(400);
    expect(response.body.data).toBeUndefined();
  });
});

describe('/api/user after user creation. ', () => {
  let expressServer = null;
  let newlyCreatedUser = null;
  let response = null;
  let userFromDB = null;
  let activationKey = null;
  beforeAll(async () => {
    expressServer = await app(db);
    jest.setTimeout(9000);
    response = await request(expressServer)
      .post('/api/user')
      .send({ ...goodUser, email: 'realuser@example.com' });
    newlyCreatedUser = response.body.data.user;
    userFromDB = await db.User.findOne({
      where: { id: newlyCreatedUser.id },
    });
    activationKey = userFromDB.activationKey;
  });

  it('should not be able to reset his password if not verified', async () => {
    const resetpassword = await request(expressServer)
      .post('/api/user/forgotPassword')
      .send({ email: newlyCreatedUser.email });

    expect(resetpassword.statusCode).toBe(400);
    expect(resetpassword.body.errors).toBeDefined();
    expect(resetpassword.body.data).toBeUndefined();
  });

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
  });
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
  });
  it.todo('should delete activation key once the user is verified');
  it('should not verify user when user is already verified', async () => {
    const verifyResponse = await request(expressServer).post(
      `/api/user/verify/${newlyCreatedUser.id}/${activationKey}`
    );
    expect(verifyResponse.statusCode).toBe(400);
    expect(verifyResponse.body.data).toBeUndefined();
    expect(verifyResponse.body.errors).toBeDefined();
  });
  it('should be able to send reset password request after verification', async () => {
    const resetpassword = await request(expressServer)
      .post('/api/user/forgotPassword')
      .send({ email: newlyCreatedUser.email });

    expect(resetpassword.statusCode).toBe(200);
    expect(resetpassword.body.data).toBeDefined();
    expect(resetpassword.body.errors).toBeUndefined();
  });
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
  });
});
