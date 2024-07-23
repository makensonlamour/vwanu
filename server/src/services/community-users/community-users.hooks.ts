import * as authentication from '@feathersjs/authentication';
// Don't remove this comment. It's needed to format import lines nicely.
import addAssociation from '../../Hooks/AddAssociations';

import OwnerOrAuthorized from './hooks/OwnerOrAuthorized';
import AgeAllow from '../../Hooks/AgeAllow';

const { authenticate } = authentication.hooks;

export default {
  before: {
    all: [authenticate('jwt'), AgeAllow],
    find: [
      (context) => {
        context.params.query = {
          ...context.params.query,
        };
      },
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
          {
            model: 'community-role',
            attributes: ['name', 'id'],
          },
        ],
      }),
    ],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [OwnerOrAuthorized],
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
