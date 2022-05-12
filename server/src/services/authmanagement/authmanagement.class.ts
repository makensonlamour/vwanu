/* eslint-disable no-unused-vars */
import { Params } from '@feathersjs/feathers';
import { BadRequest } from '@feathersjs/errors';
import { Service, SequelizeServiceOptions } from 'feathers-sequelize';
import { Application } from '../../declarations';

import checkUnique from './check-unique';
import identityChange from './identity-change';
import passwordChange from './password-change';
import resendVerifySignup from './resend-verify-signup';

import {
  resetPwdWithLongToken,
  resetPwdWithShortToken,
} from './reset-password';

import {
  verifySignupSetPasswordWithLongToken,
  verifySignupSetPasswordWithShortToken,
} from './verify-signup-set-password';

import {
  verifySignupWithLongToken,
  verifySignupWithShortToken,
} from './verify-signup';

import sendResetPwd from './send-reset-pwd';
import notifier from './notifier';
import sanitizeUserForClient from '../../lib/utils/sanitizeUserForClient';

const passwordField = 'password';
const optionsDefault = {
  app: null, // value set during configuration
  service: '/users', // need exactly this for test suite
  path: 'authManagement',
  notifier: async () => {},
  longTokenLen: 15, // token's length will be twice this
  shortTokenLen: 6,
  shortTokenDigits: true,
  resetDelay: 1000 * 60 * 60 * 2, // 2 hours
  delay: 1000 * 60 * 60 * 24 * 5, // 5 days
  resetAttempts: 0,
  reuseResetToken: false,
  identifyUserProps: ['email'],
  sanitizeUserForClient,
};
// eslint-disable-next-line import/prefer-default-export
export class AuthManagement extends Service {
  app;

  ops;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  constructor(options: Partial<SequelizeServiceOptions>, app: Application) {
    super(options);
    this.app = app;
    this.ops = { ...optionsDefault, app, notifier: notifier(app).notifier };
  }

  async create(data, params: Params) {
    switch (data.action) {
      case 'checkUnique':
        try {
          return await checkUnique(
            this.ops,
            data.value,
            data.ownId || null,
            data.meta || {}
          );
        } catch (err) {
          return Promise.reject(err); // support both async and Promise interfaces
        }
      case 'resendVerifySignup':
        try {
          return await resendVerifySignup(
            this.ops,
            data.value,
            data.notifierOptions
          );
        } catch (err) {
          return Promise.reject(err);
        }
      case 'verifySignupLong':
        try {
          return await verifySignupWithLongToken(
            this.ops,
            data.value,
            data.notifierOptions
          );
        } catch (err) {
          return Promise.reject(err);
        }
      case 'verifySignupShort':
        try {
          return await verifySignupWithShortToken(
            this.ops,
            data.value.token,
            data.value.user,
            data.notifierOptions
          );
        } catch (err) {
          return Promise.reject(err);
        }
      case 'verifySignupSetPasswordLong':
        try {
          return await verifySignupSetPasswordWithLongToken(
            this.ops,
            data.value.token,
            data.value.password,
            passwordField,
            data.notifierOptions
          );
        } catch (err) {
          return Promise.reject(err);
        }
      case 'verifySignupSetPasswordShort':
        try {
          return await verifySignupSetPasswordWithShortToken(
            this.ops,
            data.value.token,
            data.value.user,
            data.value.password,
            passwordField,
            data.notifierOptions
          );
        } catch (err) {
          return Promise.reject(err);
        }
      case 'sendResetPwd':
        try {
          return await sendResetPwd(
            this.ops,
            data.value,
            passwordField,
            data.notifierOptions
          );
        } catch (err) {
          return Promise.reject(err);
        }
      case 'resetPwdLong':
        try {
          return await resetPwdWithLongToken(
            this.ops,
            data.value.token,
            data.value.password
          );
        } catch (err) {
          return Promise.reject(err);
        }
      case 'resetPwdShort':
        try {
          return await resetPwdWithShortToken(
            this.ops,
            data.value.token,
            data.value.user,
            data.value.password,
            data.notifierOptions
          );
        } catch (err) {
          return Promise.reject(err);
        }
      case 'passwordChange':
        try {
          return await passwordChange(
            this.ops,
            data.value.user,
            data.value.oldPassword,
            data.value.password,
            passwordField,
            data.notifierOptions
          );
        } catch (err) {
          return Promise.reject(err);
        }
      case 'identityChange':
        try {
          return await identityChange(
            this.ops,
            data.value.user,
            data.value.password,
            data.value.changes,
            data.notifierOptions
          );
        } catch (err) {
          return Promise.reject(err);
        }
      case 'options':
        return this.ops;

      default:
        throw new BadRequest('This options is not supported ', {
          message: `${data.action} is not a supported authmanagement action`,
        });
    }
  }
}
