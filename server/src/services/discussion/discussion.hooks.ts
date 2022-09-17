import * as authentication from '@feathersjs/authentication';
// Don't remove this comment. It's needed to format import lines nicely.
import AutoOwn from '../../Hooks/AutoOwn';
import LimitToOwner from '../../Hooks/LimitToOwner';
import LimitToAdminOrOwnerHook from '../../Hooks/LimitToAdminOrOwner.hook';
import addAssociation from '../../Hooks/AddAssociations';

const { authenticate } = authentication.hooks;

export default {
  before: {
    all: [
      authenticate('jwt'),
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
    find: [],
    get: [],
    create: [AutoOwn],
    update: [LimitToOwner],
    patch: [LimitToAdminOrOwnerHook({})],
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
