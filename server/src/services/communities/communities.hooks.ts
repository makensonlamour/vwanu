/* eslint-disable no-underscore-dangle */
import * as authentication from '@feathersjs/authentication';
// Don't remove this comment. It's needed to format import lines nicely.

import LimitToOwner from '../../Hooks/LimitToOwner';
import { AutoOwn } from '../../Hooks';

import saveProfilePicture from '../../Hooks/SaveProfilePictures.hooks';

import filesToBody from '../../middleware/PassFilesToFeathers/feathers-to-data.middleware';

import SaveAndAttachInterests from '../../Hooks/SaveAndAttachInterest';

import { FindCommunities, AccessCommunity } from './hooks';

const AutoJoin = async (context) => {
  const { params, app, result } = context;
  const {
    User: { id },
  } = params;
  let roles;

  try {
    roles = await app.service('community-role')._find({
      query: {
        name: 'admin',
        $select: ['id'],
        $limit: 1,
      },
      paginate: false,
    });
    const adminRole = roles[0].id;
    if (!adminRole) throw new Error('No admin role found');
    await app.service('community-users').create({
      UserId: id,
      CommunityId: result.id,
      CommunityRoleId: adminRole,
    });
  } catch (err) {
    throw new Error(err.message);
  }

  return context;
};
const AutoAdmin = (context) => {
  context.data.numAdmins = 1;
  return context;
};

const { authenticate } = authentication.hooks;
export default {
  before: {
    all: [authenticate('jwt')],
    find: [FindCommunities],
    get: [AccessCommunity],
    create: [
      AutoOwn,
      AutoAdmin,
      saveProfilePicture(['profilePicture', 'coverPicture']),
      filesToBody,
    ],
    update: [],
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
      AutoJoin,
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
