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

const setupEmails = async () => {
  const templatesR = [
    {
      subject: 'Verify Signup',
      body: 'Thank you {link}',
      snug: 'VerifySignup',
    },
    {
      subject: 'Send Reset Password email',
      body: 'Thank you here is your reset password again {link}',
      snug: 'sendResetPwd',
    },
  ].map((template) => app.service('email-template').create(template));

  const templates = await Promise.all(templatesR);

  return templates;
};

/* #endregion */

describe('/authmanagement service', () => {
  let testServer;
  let user;
  let act;
  const createdTestEmailsTemplates = [];
  beforeAll(async () => {
    await app.get('sequelizeClient').sync({ logged: false });
    testServer = request(app);
    user = (await testServer.post(userEndpoint).send(goodUser)).body;
  }, 20000);

  afterAll(async () => {
    await Promise.all(
      createdTestEmailsTemplates.map((id) =>
        testServer
          .delete(`/email-template/${id}`)
          .set('authorization', user.accessToken)
      )
    );
    await testServer
      .delete(`${endpoint}/${user.id}`)
      .set('authorization', user.accessToken);
  });

  describe('Service running', () => {
    it.skip('service is running', () => {
      const service = app.service('authmanagement');
      expect(service).toBeDefined();
    });
    it.skip('should return and error if not a supported action string', async () => {
      const response = await testServer
        .post(endpoint)
        .send({})
        .set('authorization', user.accessToken);
      expect(response.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    });
  });

  describe('check unique', () => {
    it.skip('should  return `not a unique value`', async () => {
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

    it.skip('should return an empty object indicating email is not taken', async () => {
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
    it.skip('should not send an email because email templates are not set up yet', async () => {
      const response = await testServer.post(endpoint).send({
        action: 'resendVerifySignup',
        value: { email: goodUser.email },
      });

      expect(response.statusCode).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
    });

    /* #region Set up the emails  */

    it.skip('should set the emails ', async () => {
      const templates = await setupEmails();
      templates.forEach((template) => {
        createdTestEmailsTemplates.push(template.id);
        expect(template.id).toBeDefined();
      });
    });

    /* #endregion */
    it.skip('should send an email and change the user verification details', async () => {
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
    it.skip('Should not verify with the wrong activation code ', async () => {
      const response = await testServer.post(endpoint).send({
        action: 'verifySignupLong',
        value: Math.random().toString(36).substring(7),
      });

      expect(response.body).toMatchObject({
        className: 'bad-request',
        code: 400,
        errors: {},
        message: 'User not found.',
        name: 'BadRequest',
      });
    });
    it.skip('should verify signup for emails but not send the email ', async () => {
      const u = await app
        .get('sequelizeClient')
        .models.User.findOne({ where: { email: user.email } });
      act = u.activationKey;
      const response = await testServer.post(endpoint).send({
        action: 'verifySignupLong',
        value: u.activationKey,
      });

      expect(response.body).toMatchObject({
        user: expect.any(Object),
        error: 'The verifySignup template email is not setup yet',
        extraMessage: 'The server failed to send the confirmation email',
      });

      const fetchUser = await app
        .get('sequelizeClient')
        .models.User.findOne({ where: { email: user.email } });
      act = u.activationKey;

      expect(fetchUser.activationKey).toBe(null);
      expect(response.body.user.verified).toBe(true);
    });

    it.skip('should not verify signup a second time ', async () => {
      const response = await testServer.post(endpoint).send({
        action: 'verifySignupLong',
        value: act,
      });

      expect(response.body).toMatchObject({
        name: 'BadRequest',
        message: 'User not found.',
        code: 400,
        className: 'bad-request',
        errors: {},
      });
    });

    /* #region  Create activation Confirmation email */
    it.skip('should create activation Confirmation email ', async () => {
      const activationConfirmationEmail = await app
        .service('email-template')
        .create({
          subject: 'Thank you for verifying your account',
          body: 'Your account has been successfully verified',
          snug: 'activationConfirmation',
        });
      createdTestEmailsTemplates.push(activationConfirmationEmail.id);
      expect(activationConfirmationEmail.id).toBeDefined();
    });
    /* #endregion */
    it.skip('should verify signup and successfully send email', async () => {
      const rand = getRandUser();
      delete rand.id;
      const UserModel = await app.get('sequelizeClient').models.User;
      const u = await UserModel.create(rand);

      const response = await testServer.post(endpoint).send({
        action: 'verifySignupLong',
        value: u.activationKey,
      });

      expect(response.body.verified).toBeTruthy();
      expect(response.body.error).toBeUndefined();
      expect(response.body.extraMessage).toBeUndefined();
      expect(response.statusCode).toBe(StatusCodes.CREATED);

      await UserModel.destroy({ where: { id: u.id } });
    }, 7000);
  });
  describe('sendResetPwd', () => {
    it.skip('should not send reset password email when the user is unverified', async () => {
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

    it.skip('should send reset password email', async () => {
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
    it.skip('should not change the password with the wrong resetpassword token', async () => {
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
    it.skip('should reset changePassword', async () => {
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
});
