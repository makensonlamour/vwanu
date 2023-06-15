import * as feathersAuthentication from '@feathersjs/authentication';
import { disallow } from 'feathers-hooks-common';

import getFriends from './hooks/getFriends';

const { authenticate } = feathersAuthentication.hooks;

const notAllowed = disallow();
export default {
  before: {
    all: [authenticate('jwt')],
    find: [getFriends],
    get: notAllowed,
    update: notAllowed,
  },
};
