import { HookContext } from '@feathersjs/feathers';
import { BadRequest } from '@feathersjs/errors';
import { Op } from '@sequelize/core';

import userQuery from '../../../lib/utils/userQuery';

const exclude = [
  'password',
  'resetAttempts',
  'resetToken',
  'resetTokenExpires',
  'loginAttempts',
  'activationKey',
  'resetPasswordKey',
  'search_vector',
  'discord',
  'friendPrivacy',
  'friendListPrivacy',
  'wechat',
  'facebook',
  'tiktok',
  'mailru',
  'qq',
  'vk',
  'instagram',
  'youtube',
  'linkedin',
  'twitter',
  'relationshipId',
  'emailPrivacy',
  'phonePrivacy',
  'showLastSeen',
  'eVisitedNotified',
  'lastSeenPrivacy',
  'youtubePrivacy',
  'linkedinPrivacy',
  'twitterPrivacy',
  'faceBookPrivacy',
  'instagramPrivacy',
  'followPrivacy ',
  'profilePrivacy ',
  'avatar',
  'followPrivacy ',
  'profilePrivacy ',
  'username',
  'birthday',
  'backgroundImage',
  'website',
  'updatedAt',
  'RequesterRequesterId',
  'UserRequesterId',
  'CommunityId',
  'resetExpires',
  'admin',
];
export default (context: HookContext): HookContext => {
  const { app, params } = context;
  const { query: where } = context.app
    .service(context.path)
    .filterQuery(context.params);
  const Sequelize = app.get('sequelizeClient');
  context.service.options.Model = Sequelize.models.User;

  const { action, UserId } = where;
  delete where.action;
  delete where.UserId;
  const follower = `(
    EXISTS(
    SELECT 1
    FROM "User_Follower" AS "UF"
    WHERE "UF"."UserId"='${
      UserId || params.User.id
    }' AND "UF"."FollowerId"="User"."id"
  ))`;

  const following = `(
    EXISTS( 
    SELECT 1 
    FROM "User_Follower" AS "UF"
    WHERE "UF"."UserId"="User"."id" AND "UF"."FollowerId"='${
      UserId || params.User.id
    }'))`;

  const clause = {
    ...where,
    [Op.and]: [],
  };
  switch (action) {
    case 'people-who-follow-me':
      clause[Op.and].push(Sequelize.where(Sequelize.literal(follower), true));
      break;
    case 'people-i-follow':
      clause[Op.and].push(Sequelize.where(Sequelize.literal(following), true));
      break;
    default:
      throw new BadRequest('This action is not supported');
  }

  const attributes = userQuery(params.User.id, Sequelize, exclude);
  params.sequelize = {
    // logging: console.log,
    where: clause,
    attributes,
    // attributes: [
    //   'firstName',
    //   'lastName',
    //   'email',
    //   'id',
    //   'profilePicture',
    //   'createdAt',
    //   'updatedAt',
    // ],

    // attributes: {
    //   include: [[Sequelize.literal(friends), 'User']],
    // },
  };

  return context;
};
