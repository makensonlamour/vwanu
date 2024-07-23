/* eslint-disable no-underscore-dangle */
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
    create: [AutoOwn],
  },

  after: {
    create: [
      async (context) => {
        const { entityType, entityId } = context.data;
        const service = entityType === 'Post' ? 'posts' : entityType;

        const { UserId } = await context.app.service(service)._get(entityId);

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
  },
};
