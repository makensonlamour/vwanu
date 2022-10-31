import * as feathersAuthentication from '@feathersjs/authentication';
import { disallow } from 'feathers-hooks-common';
// import { BadRequest } from '@feathersjs/errors';
import Query from './hooks/querryFriendRequest';

const { authenticate } = feathersAuthentication.hooks;

export default {
  before: {
    all: [authenticate('jwt')],
    find: Query,
    get: disallow(),
    update: disallow(),
  },
};
