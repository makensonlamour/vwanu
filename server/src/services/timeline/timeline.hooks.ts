// import { HooksObject } from '@feathersjs/feathers';
import * as authentication from '@feathersjs/authentication';
// Don't remove this comment. It's needed to format import lines nicely.
// import IncludeAssociations from '../../Hooks/IncludeAssociations';
import addAssociation from '../../Hooks/AddAssociations';

const { authenticate } = authentication.hooks;

export default {
  before: {
    all: [authenticate('jwt')],
    find: [
      (context) => {
        const { params } = context;
        const { query } = params;
        query.PostId = null;
        query.privacyType = 'public';
      },

      // IncludeAssociations({
      //   include: [
      //     {
      //       model: 'posts',
      //       as: 'Comments',
      //       attributes: ['id', 'postText'],
      //       include: [
      //         {
      //           model: 'posts',
      //           as: 'User',
      //           attributes: ['id', 'firstName', 'lastName', 'profilePicture'],
      //         },
      //       ],
      //     },
      //   ],
      // }),
      addAssociation({
        models: [
          {
            model: 'reactions',
          },
          {
            model: 'posts',
            as: 'Comments',
          },
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
