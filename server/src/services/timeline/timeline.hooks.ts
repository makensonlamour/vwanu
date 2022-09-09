// import { HooksObject } from '@feathersjs/feathers';
import * as authentication from '@feathersjs/authentication';

/** Local dependencies */
import IncludeAssociations from '../../Hooks/IncludeAssociations';
import addAssociation from '../../Hooks/AddAssociations';
import OrderBy from '../../Hooks/OrderBy.hooks';

const { authenticate } = authentication.hooks;

const onlyPublic = (context) => {
  const { params } = context;
  const { query } = params;
  query.PostId = null;
  query.privacyType = 'public';
  return context;
};

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
            model: 'posts',
            as: 'Comments',
            attributes: ['id', 'postText', 'PostId', 'updatedAt', 'createdAt'],
            include: [
              {
                model: 'posts',
                as: 'User',
                attributes: UserAttributes,
              },
            ],
          },
          {
            model: 'posts',
            as: 'Media',
            include: [
              {
                model: 'posts',
                as: 'User',
                attributes: UserAttributes,
              },
            ],
          },

          {
            model: 'posts',
            as: 'Reactions',
            include: [
              {
                model: 'posts',
                as: 'User',
                attributes: UserAttributes,
              },
            ],
          },
        ],
      }),
      addAssociation({
        models: [
          {
            model: 'users',
            attributes: UserAttributes,
          },
        ],
      }),
    ],
    find: [onlyPublic, OrderBy({ createdAt: -1 })],
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
