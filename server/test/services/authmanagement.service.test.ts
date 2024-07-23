/* eslint-disable camelcase */
/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */
import request from 'supertest';
import { StatusCodes } from 'http-status-codes';

/* #region  Custom dependencies */
import app from '../../src/app';
import {
  getRandUser,
  generateFakeEmail,
} from '../../src/lib/utils/generateFakeUser';

/* #endregion */

const userEndpoint = '/users';
const endpoint = '/authmanagement';

/* #region  Global variables and helper functions */
const goodUser = getRandUser();
delete goodUser.id;

/* #endregion */

describe('/authmanagement service', () => {
  let testServer;
  let user;
  let act;

  beforeAll(async () => {
    testServer = request(app);
    user = (await testServer.post(userEndpoint).send(goodUser)).body;
  }, 20000);

  afterAll(async () => {
    await testServer
      .delete(`${endpoint}/${user.id}`)
      .set('authorization', user.accessToken);
  });

  describe('Service running', () => {
    it('service is running', () => {
      const service = app.service('authmanagement');
      expect(service).toBeDefined();
    });
    it('should return and error if not a supported action string', async () => {
      const response = await testServer
        .post(endpoint)
        .send({})
        .set('authorization', user.accessToken);
      expect(response.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    });
  });

  describe('check unique', () => {
    it('should  return `not a unique value`', async () => {
      const response = await testServer
        .post(endpoint)
        .send({ action: 'checkUnique', value: { email: goodUser.email } });

      expect(response.statusCode).toEqual(StatusCodes.BAD_REQUEST);
      expect(response.body).toEqual({
        name: 'BadRequest',
        message: 'Values already taken.',
        code: 400,
        className: 'bad-request',
        data: {},
        errors: { email: 'Already taken.' },
      });
      expect(true).toBe(true);
    });

    it('should return an empty object indicating email is not taken', async () => {
      const response = await testServer.post(endpoint).send({
        action: 'checkUnique',
        value: { email: generateFakeEmail() },
      });

      expect(response.statusCode).toEqual(StatusCodes.NO_CONTENT);
      expect(response.body).toEqual({});
      expect(true).toBe(true);
    });
  });

  describe('resendVerifySignup', () => {
    it('should change the user activation key and send a notification', async () => {
      let userR: any = await app
        .get('sequelizeClient')
        .models.User.findOne({ where: { email: user.email } });

      const oldActivationKey = userR.activationKey;

      const response = await testServer.post(endpoint).send({
        action: 'resendVerifySignup',
        value: { email: user.email },
      });

      expect(response.statusCode).toBe(StatusCodes.CREATED);

      userR = await app
        .get('sequelizeClient')
        .models.User.findOne({ where: { email: user.email } });

      expect(userR.activationKey).toEqual(expect.any(String));
      expect(userR.activationKey).not.toEqual(oldActivationKey);
      expect(userR.verified).toBe(false);

      // TODO: test the email was sent
    });
  });
  describe('verifySignupLong', () => {
    it('Should not verify with the wrong activation code ', async () => {
      const response = await testServer
        .post(endpoint)
        .send({
          action: 'verifySignupLong',
          value: Math.random().toString(36).substring(7),
        })
        .set('authorization', user.accessToken);

      expect(response.body).toMatchObject({
        className: 'bad-request',
        code: 400,
        errors: {},
        message: expect.stringContaining('User'),
        name: 'BadRequest',
      });
    });
    it('should verify signup for emails and send the email ', async () => {
      const u = await app
        .get('sequelizeClient')
        .models.User.findOne({ where: { email: user.email } });

      const { activationKey } = u;
      act = activationKey;
      const response = await testServer
        .post(endpoint)
        .send({
          action: 'verifySignupLong',
          value: activationKey,
        })
        .set('authorization', user.accessToken);

      // TODO: verify the email was sent
      const fetchUser = await app
        .get('sequelizeClient')
        .models.User.findOne({ where: { email: user.email } });

      expect(fetchUser.activationKey).toBe(null);
      expect(response.body.verified).toBe(true);
    });

    it('should not verify signup a second time ', async () => {
      const response = await testServer
        .post(endpoint)
        .send({
          action: 'verifySignupLong',
          value: act,
        })
        .set('authorization', user.accessToken);

      expect(response.body).toMatchObject({
        name: 'BadRequest',
        message: expect.stringContaining('User'),
        code: 400,
        className: 'bad-request',
        errors: {},
      });
    });
  });
  describe('sendResetPwd', () => {
    it('should not send reset password email when the user is unverified', async () => {
      const rand = getRandUser();
      delete rand.id;
      const unverifiedUser = await testServer.post(userEndpoint).send(rand);

      const response = await testServer.post(endpoint).send({
        action: 'sendResetPwd',
        value: { email: unverifiedUser.body.email },
      });

      expect(response.status).toBe(StatusCodes.BAD_REQUEST);
      expect(response.body).toEqual(
        expect.objectContaining({
          name: 'BadRequest',
          message: 'User is not verified.',
          code: 400,
          className: 'bad-request',
          errors: {},
        })
      );

      // cleaning up
      await testServer
        .delete(`${userEndpoint}/${unverifiedUser?.body.id}`)
        .set('authorization', unverifiedUser.body.accessToken);
    }, 15000);

    it('should send reset password email', async () => {
      // User is the verified user
      const response = await testServer.post(endpoint).send({
        action: 'sendResetPwd',
        value: { email: user.email },
      });

      expect(response.status).toBe(StatusCodes.CREATED);
      // Todo : test the email was sent
    });
  });

  describe('resetPwdWithLongToken', () => {
    it('should not change the password with the wrong resetpassword token', async () => {
      const newPassword = 'somePassword';
      const response = await testServer.post(endpoint).send({
        action: 'resetPwdLong',
        value: {
          token: Math.random().toString(36).substring(7),
          password: newPassword,
        },
      });

      expect(response.body).toMatchObject({
        className: 'bad-request',
        code: 400,
        errors: {},
        message: 'User not found.',
        name: 'BadRequest',
      });
    });
    it('should reset changePassword', async () => {
      const u = await app
        .get('sequelizeClient')
        .models.User.findOne({ where: { email: user.email } });

      const oldPassword = u.password;
      const newPassword = 'somePassword';
      const response = await testServer.post(endpoint).send({
        action: 'resetPwdLong',
        value: { token: u.resetPasswordKey, password: newPassword },
      });

      expect(response.body).toMatchObject({
        user: expect.any(Object),
        error: expect.any(String),
        extraMessage: expect.any(String),
      });
      const nu = await u.reload();
      const resetPass = nu.password;

      expect(nu.resetPasswordKey).toBe(null);
      expect(resetPass !== oldPassword).toBe(true);
    });
  });
  describe('Phone Verification',()=>{

    it('It can request a phone verification code', ()=>{
      console.log({user})
      // create a user 
      // add a phone number for the user 
      const userWithPhone = await testServer.patch()
      // request  phone verification code. 
      // expect a 200 response. 
    })
    it.todo('Received a new verification code when phone when not ver')
    it.todo('Recieved an error when phone is already verified')
    it.todo('Cannot verified phone with incorrect verification code')
    it.todo('Can verify phone with correct verification code')

  })
});
