import * as authentication from '@feathersjs/authentication';
import { disallow } from 'feathers-hooks-common';
// Don't remove this comment. It's needed to format import lines nicely.

const { authenticate } = authentication.hooks;
const notAllow = disallow('external');

export default {
  before: {
    create: notAllow,
    update: notAllow,
    patch: authenticate('jwt'),
    remove: notAllow,
  },
};
