import * as authentication from '@feathersjs/authentication';
// Don't remove this comment. It's needed to format import lines nicely.
import {
  AutoOwn,
  AgeAllow,
  LimitToOwner,
  IncludeAssociations,
  AdjustCount,
} from '../../Hooks';

const { authenticate } = authentication.hooks;

const AdjustCountOptions = {
  model: 'Blog',
  field: 'amountOfComments',
  key: 'BlogId',
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
      AgeAllow,
      IncludeAssociations({
        include: [
          {
            model: 'blogResponse',
            as: 'User',
            attributes: UserAttributes,
          },
        ],
      }),
    ],
    find: [],
    get: [],
    create: [AutoOwn],
    update: [],
    patch: [LimitToOwner],
    remove: [LimitToOwner],
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [AdjustCount(AdjustCountOptions)],
    update: [],
    patch: [],
    remove: [AdjustCount(AdjustCountOptions)],
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
