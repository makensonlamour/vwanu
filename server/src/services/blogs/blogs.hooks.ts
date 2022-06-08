import * as authentication from '@feathersjs/authentication';

/** Local dependencies  */
import {
  AutoOwn,
  LimitToOwner,
  OwnerAccess,
  SaveInterest,
  IncludeAssociations,
} from '../../Hooks';

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
            model: 'blogs',
            as: 'User',
            attributes: UserAttributes,
          },
          { model: 'blogs', as: 'Interests' },

          {
            model: 'blogs',
            as: 'Response',
            include: [
              {
                model: 'blogs',
                as: 'User',
                attributes: UserAttributes,
              },
            ],
          },
        ],
      }),
    ],
    find: [OwnerAccess({ publish: true })],
    get: [],
    create: [AutoOwn],
    update: [LimitToOwner],
    patch: [LimitToOwner],
    remove: [LimitToOwner],
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [SaveInterest],
    update: [SaveInterest],
    patch: [SaveInterest],
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
