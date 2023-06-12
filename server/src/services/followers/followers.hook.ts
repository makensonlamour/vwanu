import * as feathersAuthentication from '@feathersjs/authentication';
import { disallow } from 'feathers-hooks-common';

const { authenticate } = feathersAuthentication.hooks;
const notAllowed = disallow();
export default {
  before: {
    all: [authenticate('jwt')],
    get: notAllowed,
    update: notAllowed,
    patch: notAllowed,
  },
  // Might want to notify the user when someone follows or unFollow them
  after: {
    create: [],
    remove: [],
  },
};
c;
