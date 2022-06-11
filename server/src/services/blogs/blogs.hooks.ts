import commonHooks from 'feathers-hooks-common';
import * as authentication from '@feathersjs/authentication';
import saveProfilePicture from '../../Hooks/SaveProfilePictures.hooks';
/** Local dependencies  */
import {
  AutoOwn,
  LimitToOwner,
  OwnerAccess,
  SaveInterest,
  IncludeAssociations,
  ValidateResource,
  LimitedAccess,
  TrueBoolean,
} from '../../Hooks';

import * as Schema from '../../schema/blog.schema';

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
        ],
      }),
    ],
    find: [],
    get: [],
    create: [
      TrueBoolean(['publish']),
      ValidateResource(Schema.createBlogSchema),
      AutoOwn,
      SaveCover,
    ],
    update: [commonHooks.disallow('external')],
    patch: [
      commonHooks.iff(
        commonHooks.isProvider('external'),
        commonHooks.preventChanges(true, ...['slug', 'id'])
      ),
      TrueBoolean(['publish']),
      ValidateResource(Schema.editBlogSchema),
      LimitToOwner,
      SaveCover,
    ],
    remove: [LimitToOwner],
  },

  after: {
    all: [],
    find: [LimitedAccess({ publish: true })],
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
