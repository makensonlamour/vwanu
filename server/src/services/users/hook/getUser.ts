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

  const OnlyInterests = (interest) =>
    `(
  EXISTS(
    SELECT 1 FROM "Interests" AS "I" 
    INNER JOIN "User_Interest" AS "CI" ON "CI"."InterestId"="I"."id" AND "CI"."UserId"="User"."id"
    WHERE "I"."name"= '${interest}' )
  
  )`;
  const Interests = `(
SELECT 
  json_agg(
    json_build_object(
      'name',"I"."name",
      'id',"I"."id"
  )) FROM "Interests" AS "I" 
  INNER JOIN "User_Interest" AS "UI" ON "UI"."InterestId" = "I"."id"
  WHERE "UI"."UserId"="User"."id"
)`;
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

  const isAFollower = `(
        EXISTS(
          SELECT 1 FROM "User_Following" WHERE "User_Following"."UserId" = '${params.User.id}' AND "User_Following"."FollowingId" = "User"."id" 
        )
  )`;
  const iFollow = `(
        EXISTS(
          SELECT 1 FROM "User_Follower" WHERE "User_Follower"."UserId" = '${params.User.id}' AND "User_Follower"."FollowerId" = "User"."id" 
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

  const amountOfFollower = `(
    SELECT COUNT(*) FROM "User_Follower" WHERE "User_Follower"."UserId" = "User"."id"
  )::int`;
  const amountOfFollowing = `(
    SELECT COUNT(*) FROM "User_Following" WHERE "User_Following"."UserId" = "User"."id"
  )::int`;

  if (context.method === 'get') where.id = context.id;
  const attributes = {
    include: [
      [Sequelize.literal(isFriend), 'isFriend'],
      [Sequelize.literal(iFollow), 'iFollow'],
      [Sequelize.literal(isAFollower), 'IsAFollower'],
      [Sequelize.literal(hasReceivedFriendRequest), 'hasReceivedFriendRequest'],
      [Sequelize.literal(hasSentFriendRequest), 'hasSentFriendRequest'],
      [Sequelize.literal(amountOfFollower), 'amountOfFollower'],
      [Sequelize.literal(amountOfFollowing), 'amountOfFollowing'],
      [Sequelize.literal(Interests), 'Interests'],
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

  if (where.interests) {
    const { interests } = where;
    delete where.interests;
    clause[Op.and].push(
      Sequelize.where(Sequelize.literal(OnlyInterests(interests)), true)
    );
  }

  params.sequelize = {
    // logging: console.log,
    where: clause,
    attributes,
  };
  return context;
};
