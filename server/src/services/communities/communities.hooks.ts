// import { Op } from '@sequelize/core';

import * as authentication from '@feathersjs/authentication';
// Don't remove this comment. It's needed to format import lines nicely.

import LimitToOwner from '../../Hooks/LimitToOwner';
import { AutoOwn, IncludeAssociations } from '../../Hooks';

import saveProfilePicture from '../../Hooks/SaveProfilePictures.hooks';

import filesToBody from '../../middleware/PassFilesToFeathers/feathers-to-data.middleware';

import SaveAndAttachInterests from '../../Hooks/SaveAndAttachInterest';

const Autojoin = async (context) => {
  // console.log(Object.keys(context));

  const { params, app, result } = context;
  const {
    User: { id },
  } = params;

  const roles = await app.service('community-role').find({
    query: {
      name: 'admin',
      $select: ['id'],
    },
  });

  const adminRole = roles[0].id;
  await app.service('community-users').create({
    UserId: id,
    CommunityId: result.id,
    CommunityRoleId: adminRole,
    canPost: true,
    canInvite: true,
    canUploadDoc: true,
    canUploadVideo: true,
    canUploadPhoto: true,
    canMessageInGroup: true,
  });
  return context;
};
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
      Autojoin,
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
