import {
  refreshAccessToken,
  revokeRefreshToken,
  logoutUser,
} from '@jackywxd/feathers-refresh-token';

import * as feathersAuthentication from '@feathersjs/authentication';

const { authenticate } = feathersAuthentication.hooks;
export default {
  before: {
    all: [],
    find: [],
    get: [],
    create: [refreshAccessToken()],
    update: [],
    patch: [authenticate('jwt'), revokeRefreshToken()],
    remove: [authenticate('jwt'), logoutUser()],
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [
      /* logoutUser() */
    ],
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
