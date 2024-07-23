import * as feathersAuthentication from '@feathersjs/authentication';
import saveMedia from '../../Hooks/SaveProfilePictures.hooks';

import AgeAllow from '../../Hooks/AgeAllow';

const { authenticate } = feathersAuthentication.hooks;

export default {
  before: {
    all: [authenticate('jwt'), AgeAllow],
    find: [],
    get: [],
    create: [saveMedia(['original'])],
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
