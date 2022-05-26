import * as authentication from '@feathersjs/authentication';

import addAssociation from '../../Hooks/AddAssociations';

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
    create: [],
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
          .get(context.result.PostId);

        await context.app.service('notification').create({
          UserId: context.params.User.id,
          to: UserId, //
          message: 'Reacted on your post',
          type: 'direct',
          entityName: 'posts',
          entityId: context.result.PostId, //
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
