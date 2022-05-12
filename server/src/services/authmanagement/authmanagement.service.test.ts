/* eslint-disable camelcase */
/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */
import { StatusCodes } from 'http-status-codes';
import request from 'supertest';
import app from '../../app';
import {
  getRandUser,
  generateFakeEmail,
} from '../../lib/utils/generateFakeUser';

const userEndpoint = '/users';
const endpoint = '/authmanagement';

/* #region  Global variables Main */
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
    it('should test auth', () => {
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

    it('should return an empty object', async () => {
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
    it('should not send an email because email templates are not set up yet', async () => {
      const response = await testServer.post(endpoint).send({
        action: 'resendVerifySignup',
        value: { email: goodUser.email },
      });

      expect(response.statusCode).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
    });

    /** Set up the emails  */
    it('should set the emails ', async () => {
      const templates = await setupEmails();
      templates.forEach((template) => {
        createdTestEmailsTemplates.push(template.id);
        expect(template.id).toBeDefined();
      });
    });
    /** End of set up the emails  */

    it('should send an email and change the user verification details', async () => {
      const response = await testServer.post(endpoint).send({
        action: 'resendVerifySignup',
        value: { email: user.email },
      });

      expect(response.statusCode).toBe(StatusCodes.CREATED);

      const userR: any = await app
        .get('sequelizeClient')
        .models.User.findOne({ where: { email: user.email } });

      expect(userR.activationKey).toEqual(expect.any(String));
      expect(userR.verified).toBe(false);
    });
  });
  describe('verifySignupLong', () => {
    it('should verify signup for emails but not send the email ', async () => {
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
        error: expect.any(String),
        extraMessage: expect.any(String),
      });
      expect(response.body.user.verified).toBeTruthy();
    });

    it('should not verify signup a second time ', async () => {
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

    /** Create activation Confirmation email * */

    it('should create activation Confirmation email ', async () => {
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
    /** End of Create activation Confirmation email */

    it('should verify signup and successfully send email', async () => {
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
      try {
        await UserModel.destroy({ where: { id: u.id } });
      } catch (e) {
        // eslint-disable-next-line no-console
        console.log(e);
      }
    }, 7000);
  });
  describe('sendResetPwd', () => {
    it('should not send reset password email because the user is unverified', async () => {
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

      await testServer
        .delete(`${userEndpoint}/${unverifiedUser?.body.id}`)
        .set('authorization', unverifiedUser.body.accessToken);
    }, 15000);

    it('should send reset password email', async () => {
      const response = await testServer.post(endpoint).send({
        action: 'sendResetPwd',
        value: { email: user.email },
      });

      expect(response.status).toBe(StatusCodes.CREATED);
    });
  });

  describe('resetPwdWithLongToken', () => {
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
      expect(oldPassword !== newPassword && resetPass !== oldPassword).toBe(
        true
      );
    });
  });
});
