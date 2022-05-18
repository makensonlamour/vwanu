import * as feathersAuthentication from '@feathersjs/authentication';
import { disallow } from 'feathers-hooks-common';

const { authenticate } = feathersAuthentication.hooks;
export default {
  before: {
    all: [authenticate('jwt')],
    find: [],
    get: [disallow()],
    create: [
      async (context) => {
        context.data.FollowerId = context.params.User.id;
        await context.app.get('sequelizeClient').models.User_Following.create({
          FollowingId: context.data.UserId,
          UserId: context.params.User.id,
        });
        return context;
      },
    ],
    update: [disallow()],
    patch: [disallow()],
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
