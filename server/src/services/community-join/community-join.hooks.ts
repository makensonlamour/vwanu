import * as authentication from '@feathersjs/authentication';

import { BadRequest } from '@feathersjs/errors';
// Don't remove this comment. It's needed to format import lines nicely.

const { authenticate } = authentication.hooks;

const PublicCommunityOnly = async (context) => {
  const { data, app, type } = context;
  let community = null;
  switch (type) {
    case 'before':
      community = await app.service('communities').get(data.communityId);

      if (community.privacyType !== 'hidden')
        return new BadRequest('Only public community can be joined');

      break;
    case 'after':
      break;

    default:
      throw new Error('This options if not allowed');
  }

  return context;
};

const AttachingRole = (role) => async (context) => {
  const { app, data } = context;
  const memberRole = await app
    .service('community-role')
    .find({ query: { role, $select: ['id'] } });

  data.CommunityRoleId = memberRole[0].id;
  return context;
};
export default {
  before: {
    all: [authenticate('jwt')],
    find: [],
    get: [],
    create: [PublicCommunityOnly, AttachingRole({ name: 'member' })],
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
