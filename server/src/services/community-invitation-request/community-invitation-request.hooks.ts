import * as authentication from '@feathersjs/authentication';

import { BadRequest } from '@feathersjs/errors';
/** Local dependencies */
import AutoAssign from '../../Hooks/AutoAssign.hook';
import { AddAssociations } from '../../Hooks';

const { authenticate } = authentication.hooks;
const attributes = [
  'firstName',
  'lastName',
  'id',
  'profilePicture',
  'createdAt',
];
export const IncludeGuests = AddAssociations({
  models: [
    {
      model: 'users',
      as: 'guest',
      attributes,
    },

    {
      model: 'users',
      as: 'host',
      attributes,
    },
    {
      model: 'community-role',
    },
  ],
});

const noDuplicateInvitation = async (context) => {
  const { app, data } = context;
  const { guestId, hostId, CommunityId } = data;
  const existingInvitation = await app
    .service('community-invitation-request')
    .find({
      where: {
        guestId,
        hostId,
        CommunityId,
        response: null,
      },
    });

  if (existingInvitation.length)
    throw new BadRequest(
      'This person already has an invitation for this community'
    );

  return context;
};
export default {
  before: {
    all: [authenticate('jwt'), IncludeGuests],
    find: [],
    get: [],
    create: [AutoAssign({ hostId: null }), noDuplicateInvitation],
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
