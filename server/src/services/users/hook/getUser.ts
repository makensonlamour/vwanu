import { Op } from '@sequelize/core';
import { BadRequest } from '@feathersjs/errors';
import { HookContext } from '@feathersjs/feathers';

export default (context: HookContext) => {
  const { app, params } = context;
  if (!params.provider) return context;
  if (!params?.User?.id)
    throw new BadRequest('You must be logged in to access this route');

  const Sequelize = app.get('sequelizeClient');

  const { query: where } = context.app
    .service(context.path)
    .filterQuery(context.params);

  const friends = `(
       EXISTS(
        SELECT 1 FROM "User_friends" WHERE "User_friends"."UserId" = "User"."id" AND "User_friends"."friendId" = '${params.User.id}'
       )
      )`;

  const isFriend = `(
        EXISTS(
          SELECT 1 FROM "User_friends" WHERE ("User_friends"."UserId" = '${params.User.id}' AND "User_friends"."friendId" = "User"."id") OR ("User_friends"."UserId" = "User"."id" AND "User_friends"."friendId" = '${params.User.id}')
        )
  )`;
  const hasReceivedFriendRequest = `(
    EXISTS(
    SELECT  1 FROM "User_friends_request" WHERE "User_friends_request"."UserId" ='${params.User.id}' AND "User_friends_request"."friendsRequestId" =  "User"."id" 
      ))`;

  const hasSentFriendRequest = `(
    EXISTS(
    SELECT  1 FROM "User_friends_request" WHERE ("User_friends_request"."friendsRequestId" = '${params.User.id}' AND "User_friends_request"."UserId" = "User"."id" )
      ))`;

  if (context.method === 'get') where.id = context.id;
  const attributes = {
    include: [
      [Sequelize.literal(isFriend), 'isFriend'],
      [Sequelize.literal(hasReceivedFriendRequest), 'hasReceivedFriendRequest'],
      [Sequelize.literal(hasSentFriendRequest), 'hasSentFriendRequest'],
    ],
  };
  delete where?.profilePrivacy;
  let clause = {
    ...where,
    [Op.and]: {
      [Op.or]: [
        { profilePrivacy: 'public' },
        { id: params?.User?.id },
        {
          [Op.and]: [{ profilePrivacy: 'friends' }, Sequelize.literal(friends)],
        },
      ],
    },
  };
  if (where.friends) {
    delete where.friends;
    clause = {
      ...where,
      [Op.and]: [Sequelize.literal(friends)],
    };
  }

  params.sequelize = {
    // logging: console.log,
    where: clause,
    attributes,
  };
  return context;
};
