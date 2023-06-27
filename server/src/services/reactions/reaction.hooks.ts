import * as authentication from '@feathersjs/authentication';

import addAssociation from '../../Hooks/AddAssociations';
import AutoOwn from '../../Hooks/AutoOwn';

const { authenticate } = authentication.hooks;

export default {
  before: {
    all: [authenticate('jwt')],
    find: [
      addAssociation({
        models: [
          {
            model: 'users',
            attributes: [
              'firstName',
              'lastName',
              'id',
              'profilePicture',
              'createdAt',
            ],
          },
        ],
      }),
    ],
    get: [],
    create: [AutoOwn],
    update: [],
    patch: [],
    remove: [],
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [
      async (context) => {
        const { UserId } = await context.app
          .service('posts')
          .get(context.result.id);
        await context.app.service('notification').create({
          UserId: context.params.User.id,
          to: UserId, //
          message: 'Reacted on your post',
          type: 'direct',
          entityName: 'posts',
          entityId: context.result.id, //
        });
        return context;
      },
    ],
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
