import commonHooks from 'feathers-hooks-common';
import * as authentication from '@feathersjs/authentication';

import { AutoOwn, LimitToOwner, IncludeAssociations } from '../../Hooks';

const { authenticate } = authentication.hooks;

const UserAttributes = [
  'firstName',
  'lastName',
  'id',
  'profilePicture',
  'createdAt',
];
export default {
  before: {
    all: [
      authenticate('jwt'),
      IncludeAssociations({
        include: [
          {
            model: 'korem',
            as: 'User',
            attributes: UserAttributes,
          },
        ],
      }),
    ],
    find: [],
    get: [],
    create: [AutoOwn],
    update: [commonHooks.disallow('external')],
    patch: [LimitToOwner],
    remove: [LimitToOwner],
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
