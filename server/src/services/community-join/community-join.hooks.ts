import { disallow } from 'feathers-hooks-common';
import * as authentication from '@feathersjs/authentication';

import validateResource from '../../middleware/validateResource';
import createCommunityJoinSchema from '../../schema/community-join';

const { authenticate } = authentication.hooks;

export default {
  before: {
    all: [authenticate('jwt')],
    find: disallow(),
    get: disallow(),
    create: validateResource(createCommunityJoinSchema),
    update: disallow(),
    patch: disallow(),
    remove: disallow(),
  },

  after: {
    create: [],
  },
};
