import { Op } from '@sequelize/core';
import * as feathersAuthentication from '@feathersjs/authentication';
/** Local dependencies */
import validateResource from '../../middleware/validateResource';
import * as schema from '../../schema/post';
import IncludeAssociations from '../../Hooks/IncludeAssociations';

const { authenticate } = feathersAuthentication.hooks;

export default {
  before: {
    all: [
      authenticate('jwt'),
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

    find: [
      async (context) => {
        const { params, app } = context;
        const { query } = params;

        query.PostId = null;
        query.privacyType = 'public';

        if (
          query.UserId &&
          params.User.id.toString() !== query.UserId.toString()
        ) {
          const people = await app.service('users').Model.findAll({
            where: { id: { [Op.or]: [params.User.id, query.UserId] } },
          });

          if (people.length !== 2) throw new Error('The user was not found');

          const actualUser = people.find(
            (person) => person.id === params.User.id
          );

          const otherUser = people.find((person) => person.id === query.UserId);

          if (!actualUser || !otherUser) {
            throw new Error('The user was not found');
          }
        }

        return context;
      },
    ],
    get: [],
    create: [
      async (context) => {
        context.data.UserId = context.params.User.id;
        return context;
      },
      validateResource(schema.createPostSchema),
    ],
    update: [],
    patch: [],
    remove: [],
  },

  after: {
    all: [
      // async (context) => {
      //   const { UserId } = context.result;
      //   const user = await context.app.service('users').get(UserId);
      //   context.result.user = user;
      //   return context;
      // },
    ],
    find: [
      (context) => {
        console.log(context.data);
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
