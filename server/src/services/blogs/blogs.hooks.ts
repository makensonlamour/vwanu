import commonHooks from 'feathers-hooks-common';
import * as authentication from '@feathersjs/authentication';
import saveProfilePicture from '../../Hooks/SaveProfilePictures.hooks';
/** Local dependencies  */
import {
  AutoOwn,
  LimitToOwner,
  SaveInterest,
  ValidateResource,
  TrueBoolean,
} from '../../Hooks';

import QueryBlogs from './hooks/findBlog';

import * as Schema from '../../schema/blog.schema';

const { authenticate } = authentication.hooks;

const SaveCover = saveProfilePicture(['coverPicture']);
export default {
  before: {
    all: [authenticate('jwt')],
    find: [QueryBlogs],
    get: [QueryBlogs],
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
    find: [],
    get: [],
    create: [SaveInterest],
    update: [],
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
