// import { Op } from '@sequelize/core';

import * as authentication from '@feathersjs/authentication';
// Don't remove this comment. It's needed to format import lines nicely.

import LimitToOwner from '../../Hooks/LimitToOwner';
import { AutoOwn } from '../../Hooks';

const { authenticate } = authentication.hooks;

// const AuthorizedOrPublic = async (context) => {
//   const { params, app } = context;
//   const { id } = context.params.User;

//   const { CommunitiesUsers, Communities } = app.get('sequelizeClient').models;

//   const communities = await CommunitiesUsers.find({
//     where: { UserId: id },
//   });

//   const otherCommunities = await Communities.find({
//     where: { privacyType: { [Op.or]: ['private', 'hidden'] } },
//   });

//   // search along the members table if the current user is in
// };
export default {
  before: {
    all: [authenticate('jwt')],
    find: [],
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
