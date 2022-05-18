import { disallow } from 'feathers-hooks-common';
import * as feathersAuthentication from '@feathersjs/authentication';

const { authenticate } = feathersAuthentication.hooks;
export default {
  before: {
    all: [],
    find: [
      authenticate('jwt'),
      async (context) => {
        const { params } = context;
        const { action } = context.params.query;
        delete params.query.action;
        if (!params.provider) return context;

        if (!action) throw new Error('please set an action');

        switch (action) {
          case 'people-who-visited-me':
            params.query.UserId = params.User.id;
            params.query.$select = ['VisitorId'];
            break;

          case 'people-I-visited':
            params.query.VisitorId = params.User.id;
            params.query.$select = ['UserId'];
            break;

          default:
            throw new Error('This action is not supported');
        }

        return context;
      },
    ],
    get: [disallow()],
    create: [disallow('external')],
    update: [disallow()],
    patch: [disallow()],
    remove: [disallow()],
  },

  after: {
    all: [],
    find: [
      async (context) => {
        if (!context.params.provider) return context;
        const { app } = context;
        const key = Object.keys(context.result[0])[0];

        const data = context.result.map((Visit) => Visit[key]);

        const visitors = await app.service('users').find({
          query: {
            id: { $in: data },
            $select: ['firstName', 'lastName', 'id', 'profilePicture'],
          },
        });
        context.result = visitors.data;
        return context;
      },
    ],
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
