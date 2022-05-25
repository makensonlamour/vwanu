import * as feathersAuthentication from '@feathersjs/authentication';

const { authenticate } = feathersAuthentication.hooks;
const errors = (context) => {
  console.error(context.error.message || context.error);
  return context;
};
export default {
  before: {
    all: [],
    find: [
      authenticate('jwt'),
      // async (context) => {
      //   const { params } = context;

      //   params.query.UserId = params.User.id;
      //   params.query.$select = ['friendId'];

      //   return context;
      // },
    ],
    get: [authenticate('jwt')],
    create: [
      authenticate('jwt'),
      // (context) => {
      //   if (!context.params.provider) return context;
      //   context.data.RequesterId = context.params.User.id;
      //   return context;
      // },
    ],
    update: [authenticate('jwt')],
    patch: [authenticate('jwt')],
    remove: [authenticate('jwt')],
  },

  after: {
    all: [],
    find: [
      // async (context) => {
      //   if (!context.params.provider) return context;
      //   const { app } = context;
      //   if (context.result.length < 1) return context;
      //   const key = Object.keys(context.result[0])[0];
      //   const data = context.result.map((req) => req[key]);
      //   const req = await app.service('users').find({
      //     query: {
      //       id: { $in: data },
      //       $select: ['firstName', 'lastName', 'id', 'profilePicture'],
      //     },
      //   });
      //   context.result = req.data;
      //   return context;
      // },
    ],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },

  error: {
    all: [errors],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },
};
