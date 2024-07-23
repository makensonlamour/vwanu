import * as authentication from '@feathersjs/authentication';
import { BadRequest } from '@feathersjs/errors';

/** Local dependencies */
import AutoAssign from '../../Hooks/AutoAssign.hook';
import { AddAssociations, AgeAllow } from '../../Hooks';
import UrlToMedia from '../../lib/utils/UrlToMedia';

import { OnlyNotResponded } from './hook';

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
    {
      model: 'communities',
    },
  ],
});

export const TransformProfilePicture = (context) => {
  const { result } = context;
  let newGuestObject;
  let newHostObject;

  if (result[0].guest) {
    newGuestObject.profilePicture = UrlToMedia(result.guest.profilePicture);
  }
  if (result[0].host) {
    newHostObject.profilePicture = UrlToMedia(result[0].host.profilePicture);
  }

  return context;
};
const noDuplicateInvitation = async (context) => {
  const { app, data } = context;
  const { guestId, hostId, CommunityId } = data;

  try {
    const { CommunityInvitationRequest } = app.get('sequelizeClient').models;
    const existingInvitation = await CommunityInvitationRequest.findOne({
      where: {
        guestId,
        hostId,
        CommunityId,
        response: null,
      },
    });
    if (existingInvitation)
      throw new BadRequest(
        'This person already has an invitation for this community'
      );
  } catch (e) {
    throw new BadRequest(e);
  }

  return context;
};

const notifyInvitation = async (context) => {
  const {
    app,
    data,
    result,
    params: { User },
  } = context;
  if (!result) return context;
  const { guestId, CommunityId } = data;
  await app.service('notification').create({
    UserId: User.id,
    to: guestId,
    message: 'Invited you to a community',
    type: 'direct',
    entityName: 'Community',
    entityId: CommunityId,
  });

  return context;
};
export default {
  before: {
    all: [authenticate('jwt'), AgeAllow, IncludeGuests],
    find: [OnlyNotResponded],
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
    create: [notifyInvitation],
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
