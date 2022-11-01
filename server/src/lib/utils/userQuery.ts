/* eslint-disable no-param-reassign */
import { Op } from '@sequelize/core';

export const AreFriends = (UserId, Sequelize) => {
  const friends = `(
    EXISTS(
    SELECT 1 
    FROM "User_friends" 
    WHERE "User_friends"."UserId" = "User"."id" AND "User_friends"."friendId" = '${UserId}'
    ))`;
  return Sequelize.literal(friends);
};
export const OnlyInterests = (interest) =>
  `(
  EXISTS(
    SELECT 1 FROM "Interests" AS "I" 
    INNER JOIN "User_Interest" AS "CI" ON "CI"."InterestId"="I"."id" AND "CI"."UserId"="User"."id"
    WHERE "I"."name"= '${interest}' )
  
  )`;
export const notMemberOfCommunity = (communityId) => `(
  NOT EXISTS(
    SELECT 1 FROM 
    "CommunityUsers" AS "CU"
    LEFT JOIN "CommunityInvitationRequests" AS "CIR" ON "CIR"."guestId"="CU"."UserId"
    WHERE 
   ("CU"."UserId"="User"."id" AND
   "CU"."CommunityId"='${communityId}') 
    OR (
    "CIR"."CommunityId"='${communityId}'  
    AND "CIR"."response" IS NULL) 
  )
  )`;
export const queryClause = (context, where) => {
  const { app, params } = context;
  const Sequelize = app.get('sequelizeClient');
  delete where?.profilePrivacy;
  let clause = {
    ...where,
    [Op.and]: [
      {
        [Op.or]: [
          { profilePrivacy: 'public' },
          { id: params?.User?.id },
          {
            [Op.and]: [
              { profilePrivacy: 'friends' },
              AreFriends(params.User.id, Sequelize),
            ],
          },
        ],
      },
    ],
  };
  if (where.friends) {
    delete where.friends;
    clause = {
      ...where,
      [Op.and]: [AreFriends(params.User.id, Sequelize)],
    };
  }

  if (where.notCommunityMember) {
    const { notCommunityMember } = where;
    delete where?.notCommunityMember;
    delete clause?.notCommunityMember;

    if (Array.isArray(clause[Op.and])) {
      clause[Op.and].push(
        Sequelize.where(
          Sequelize.literal(notMemberOfCommunity(notCommunityMember)),
          true
        )
      );
    } else {
      clause = {
        ...where,
        [Op.and]: [
          Sequelize.where(
            Sequelize.literal(notMemberOfCommunity(notCommunityMember)),
            true
          ),
        ],
      };
    }
  }

  if (where.interests) {
    const { interests } = where;
    delete where.interests;
    clause[Op.and].push(
      Sequelize.where(Sequelize.literal(OnlyInterests(interests)), true)
    );
  }
  return clause;
};
export const Addresses = `(
  SELECT 
    json_agg(
      json_build_object(
        'id', "EntityAddresses"."id",
        --'street', "Streets"."name",  
        'country', "Countries"."name",
        'state', "States"."name",
        'city', "Cities"."name",
        'addressType', "AddressTypes"."description"
      ))
    FROM "EntityAddresses"
    INNER JOIN "Addresses" ON "Addresses"."id" = "EntityAddresses"."AddressId"
    --INNER JOIN "Streets" ON "Streets"."id" = "Addresses"."StreetId"
    INNER JOIN "Cities" ON "Cities"."id" = "Addresses"."CityId"
    INNER JOIN "States" ON "States"."id" = "Addresses"."StateId"
    INNER JOIN "Countries" ON "Countries"."id" = "Addresses"."CountryId"
    INNER JOIN "AddressTypes" ON "AddressTypes"."id" = "EntityAddresses"."AddressTypeId"
    WHERE "EntityAddresses"."UserId" = "User"."id"
  )`;
export default (UserId, Sequelize) => {
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

  const isFriend = `(
        EXISTS(
          SELECT 1 FROM "User_friends" WHERE ("User_friends"."UserId" = '${UserId}' AND "User_friends"."friendId" = "User"."id") OR ("User_friends"."UserId" = "User"."id" AND "User_friends"."friendId" = '${UserId}')
        )
  )`;

  const iFollow = `(
        EXISTS(
          SELECT 1 FROM "User_Following" WHERE "User_Following"."UserId" = '${UserId}' AND "User_Following"."FollowingId" = "User"."id" 
        )
  )`;
  const isAFollower = `(
        EXISTS(
          SELECT 1 FROM "User_Follower" WHERE "User_Follower"."UserId" = '${UserId}' AND "User_Follower"."FollowerId" = "User"."id" 
        )
  )`;
  const hasReceivedFriendRequest = `(
    EXISTS(
    SELECT  1 FROM "User_friends_request" WHERE "User_friends_request"."UserId" ='${UserId}' AND "User_friends_request"."friendsRequestId" =  "User"."id" 
      ))`;

  const hasSentFriendRequest = `(
    EXISTS(
    SELECT  1 FROM "User_friends_request" WHERE ("User_friends_request"."friendsRequestId" = '${UserId}' AND "User_friends_request"."UserId" = "User"."id" )
      ))`;

  const amountOfFollower = `(
    SELECT COUNT(*) FROM "User_Follower" WHERE "User_Follower"."UserId" = "User"."id"
  )::int`;
  const amountOfFollowing = `(
    SELECT COUNT(*) FROM "User_Following" WHERE "User_Following"."UserId" = "User"."id"
  )::int`;

  const amountOfFriendRequest = `(
    SELECT COUNT(*) FROM "User_friends_request" WHERE "User_friends_request"."friendsRequestId" = "User"."id"
  )::int`;

  const amountOfFriend = `(
    SELECT COUNT(*) FROM "User_friends" WHERE "User_friends"."friendId" = "User"."id") 
  ::int`;
  return {
    include: [
      [Sequelize.literal(isFriend), 'isFriend'],
      [Sequelize.literal(iFollow), 'iFollow'],
      [Sequelize.literal(isAFollower), 'IsAFollower'],
      [Sequelize.literal(hasReceivedFriendRequest), 'hasReceivedFriendRequest'],
      [Sequelize.literal(hasSentFriendRequest), 'hasSentFriendRequest'],
      [Sequelize.literal(amountOfFollower), 'amountOfFollower'],
      [Sequelize.literal(amountOfFollowing), 'amountOfFollowing'],
      [Sequelize.literal(amountOfFriend), 'amountOfFriend'],
      [Sequelize.literal(Interests), 'Interests'],
      [Sequelize.literal(Addresses), 'Addresses'],
      [Sequelize.literal(amountOfFriendRequest), 'amountOfFriendRequest'],
    ],
    exclude: [
      'password',
      'resetAttempts',
      'resetToken',
      'resetTokenExpires',
      'loginAttempts',
      'activationKey',
      'resetPasswordKey',
      'search_vector',
    ],
  };
};
