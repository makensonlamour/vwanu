// import { HooksObject } from '@feathersjs/feathers';
import { HookContext } from '@feathersjs/feathers';
import * as authentication from '@feathersjs/authentication';
// Don't remove this comment. It's needed to format import lines nicely.

const { authenticate } = authentication.hooks;
export default {
  before: {
    all: [authenticate('jwt')],
    find: [],
    get: [],
    create: [
      (context) => {
        context.data.callerId = context.params.User.id;
        return context;
      },
    ],
    update: [],
    patch: [],
    remove: [],
  },

  after: {
    all: [
      (context: HookContext) => {
        if (context.data.callDetails)
          context.result.details = context.data.callDetails;
        return context;
      },
    ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },

  error: {
    all: [
      (context) => {
        console.log('Error in call service', context.error);
        return context;
      },
    ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },
};
