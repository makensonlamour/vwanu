import { disallow } from 'feathers-hooks-common';
import * as feathersAuthentication from '@feathersjs/authentication';

import AutoOwn from '../../Hooks/AutoOwn'
import sendVerificationCode from './hooks/sendVerificationCode';

const { authenticate } = feathersAuthentication.hooks;
const notAllow = disallow('external');



export default {
  before: {
    all: [authenticate('jwt'), AutoOwn],
    get: notAllow,
    update: notAllow,// only his own phone number 
    patch: [AutoOwn],// todo only his own phone number 
    remove: notAllow,// only his own phone number 
  },

  after: {
    create: sendVerificationCode({ successMessage: 'Verification code sent successfully' })
  }
};
