import * as authentication from '@feathersjs/authentication';
// import { fastJoin } from 'feathers-hooks-common';

import { createCallSchema } from '../../schema/call';
import validateResource from '../../middleware/validateResource';
import {
  AssignCaller,
  ReturnCallDetails,
  RegisterCallErrors,
  IncludePeople,
} from './hooks';

// import { resolvers, query } from './hooks/IncludePeople';

const { authenticate } = authentication.hooks;
export default {
  before: {
    all: [authenticate('jwt')],
    find: [],
    get: [],
    create: [
      validateResource(createCallSchema),
      AssignCaller,
      (C) => {
        console.log('b4 include people');
        return C;
      },
      // fastJoin(resolvers, query),
      (C) => {
        console.log('after include people');

        return C;
      },
    ],
    update: [],
    patch: [],
    remove: [],
  },

  after: {
    all: [ReturnCallDetails, IncludePeople],
    find: [],
    get: [],
    create: [
      (C) => {
        console.log('after include people');
        console.log(C.result);
        return C;
      },
    ],
    update: [],
    patch: [],
    remove: [],
  },

  error: {
    all: [RegisterCallErrors],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },
};
