import * as authentication from '@feathersjs/authentication';

import { BadRequest } from '@feathersjs/errors';
// Don't remove this comment. It's needed to format import lines nicely.

import { IncludeGuests } from '../community-invitation-request/community-invitation-request.hooks';

const { authenticate } = authentication.hooks;

const PublicCommunityOnly = async (context) => {
  const { data, app } = context;
  let community = null;

  // eslint-disable-next-line no-underscore-dangle
  community = await app.service('communities')._get(data.CommunityId);

  if (community?.privacyType !== 'public')
    throw new BadRequest('Only public community can be joined');
  data.guestId = context.params.User.id;
  data.response = true;
  data.responseDate = Date.now();

  return context;
};

const AttachingRole = (role) => async (context) => {
  const { app, data } = context;
  const memberRole = await app
    .service('community-role')
    .find({ query: { ...role, $select: ['id'] }, paginate: false });

  data.CommunityRoleId = memberRole[0].id;
  return context;
};

const addUserToCommunity = async (context) => {
  const { app, data } = context;
  const { id } = context.params.User;
  const { CommunityId } = data;

  const memberRole = await app
    .service('community-role')
    .find({ query: { name: 'member', $select: ['id'] }, paginate: false });

  const role = memberRole[0].id;

  const alreadyMember = await app.service('community-users').find({
    query: { CommunityId, UserId: id },
  });

  if (alreadyMember.length)
    throw new BadRequest('You are already a member of this community');
  await app.service('community-users').create({
    CommunityId,
    UserId: id,
    CommunityRoleId: role,
  });

  return context;
};
export default {
  before: {
    all: [authenticate('jwt'), IncludeGuests],
    find: [],
    get: [],
    create: [
      PublicCommunityOnly,

      AttachingRole({ name: 'member' }),
      addUserToCommunity,
    ],
    update: [],
    patch: [],
    remove: [],
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
