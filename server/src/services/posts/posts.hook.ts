import * as feathersAuthentication from '@feathersjs/authentication';
/** Local dependencies */
import validateResource from '../../middleware/validateResource';
import * as schema from '../../schema/post';
import IncludeAssociations from '../../Hooks/IncludeAssociations';

const { authenticate } = feathersAuthentication.hooks;

export default {
  before: {
    all: [
      IncludeAssociations({
        include: [
          {
            model: 'posts',
            as: 'Comments',
            attributes: ['id', 'postText'],
            include: [
              {
                model: 'posts',
                as: 'User',
                attributes: ['id', 'firstName', 'lastName', 'profilePicture'],
              },
            ],
          },
        ],
      }),
    ],

    find: [authenticate('jwt')],
    get: [authenticate('jwt')],
    create: [
      authenticate('jwt'),
      async (context) => {
        context.data.UserId = context.params.User.id;
        return context;
      },
      validateResource(schema.createPostSchema),
    ],
    update: [authenticate('jwt')],
    patch: [authenticate('jwt')],
    remove: [authenticate('jwt')],
  },

  after: {
    all: [
      async (context) => {
        const { UserId } = context.result;
        const user = await context.app.service('users').get(UserId);

        context.result.user = user;

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
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },
};
