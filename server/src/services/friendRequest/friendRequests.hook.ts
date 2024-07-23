import * as feathersAuthentication from '@feathersjs/authentication';
import { disallow } from 'feathers-hooks-common';
// import { BadRequest } from '@feathersjs/errors';
import notify from './hooks/notify';
import Query from './hooks/querryFriendRequest';

import AgeAllow from '../../Hooks/AgeAllow';

const { authenticate } = feathersAuthentication.hooks;

export default {
  before: {
    all: [authenticate('jwt'), AgeAllow],
    find: Query,
    get: disallow(),
    update: disallow(),
  },
  after: {
    create: notify,
  },
};
