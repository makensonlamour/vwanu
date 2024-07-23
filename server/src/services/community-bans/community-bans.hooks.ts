import * as authentication from '@feathersjs/authentication';
// Don't remove this comment. It's needed to format import lines nicely.

import * as schema from '../../schema/bans';
import validateResource from '../../middleware/validateResource';
import AgeAllow from '../../Hooks/AgeAllow';

const { authenticate } = authentication.hooks;

export default {
  before: {
    all: [authenticate('jwt'), AgeAllow],
    create: validateResource(schema.createBanSchema),
    find: [],
    get: [],
    update: [],
    patch: [],
    remove: [],
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },
};
