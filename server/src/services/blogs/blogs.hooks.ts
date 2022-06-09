import * as authentication from '@feathersjs/authentication';
import saveProfilePicture from '../../Hooks/SaveProfilePictures.hooks';
/** Local dependencies  */
import {
  AutoOwn,
  LimitToOwner,
  OwnerAccess,
  SaveInterest,
  IncludeAssociations,
  // ValidateResource,
} from '../../Hooks';

// import * as Schema from '../../schema/blog.schema';

const { authenticate } = authentication.hooks;
const UserAttributes = [
  'firstName',
  'lastName',
  'id',
  'profilePicture',
  'createdAt',
];
const SaveCover = saveProfilePicture(['coverPicture']);
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
    create: [AutoOwn, SaveCover],
    update: [LimitToOwner, SaveCover],
    patch: [LimitToOwner, SaveCover],
    remove: [LimitToOwner],
  },

  after: {
    all: [],
    find: [],
    get: [OwnerAccess({ publish: true })],
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
