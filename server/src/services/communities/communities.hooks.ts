// import { Op } from '@sequelize/core';

import * as authentication from '@feathersjs/authentication';
// Don't remove this comment. It's needed to format import lines nicely.

import LimitToOwner from '../../Hooks/LimitToOwner';
import { AutoOwn, IncludeAssociations } from '../../Hooks';

import saveProfilePicture from '../../Hooks/SaveProfilePictures.hooks';

import filesToBody from '../../middleware/PassFilesToFeathers/feathers-to-data.middleware';

import SaveAndAttachInterests from '../../Hooks/SaveAndAttachInterest';

const { authenticate } = authentication.hooks;
export default {
  before: {
    all: [
      authenticate('jwt'),
      IncludeAssociations({
        include: [{ model: 'communities', as: 'Interests' }],
      }),
    ],
    find: [],
    get: [],
    create: [
      AutoOwn,
      saveProfilePicture(['profilePicture', 'coverPicture']),
      filesToBody,
    ],
    update: [LimitToOwner],
    patch: [
      LimitToOwner,
      saveProfilePicture(['profilePicture', 'coverPicture']),
    ],
    remove: [LimitToOwner],
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [
      SaveAndAttachInterests({
        entityName: 'Community',
        relationTableName: 'Community_Interest',
        foreignKey: 'CommunityId',
      }),
    ],
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
