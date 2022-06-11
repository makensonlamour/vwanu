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
