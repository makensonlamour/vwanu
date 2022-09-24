import * as authentication from '@feathersjs/authentication';

/** Local dependencies */
import GetTimeline from './hooks/getTimeline';

const { authenticate } = authentication.hooks;


export default {
  before: {
    all: [authenticate('jwt')],
    find: [GetTimeline],
    get: [GetTimeline],
    create: [],
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
