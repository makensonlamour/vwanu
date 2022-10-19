export const AreFriends = (UserId, Sequelize) => {
  const friends = `(
    EXISTS(
    SELECT 1 
    FROM "User_friends" 
    WHERE "User_friends"."UserId" = "User"."id" AND "User_friends"."friendId" = '${UserId}'
    ))`;
  return Sequelize.literal(friends);
};
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

  // "User_friends"."UserId" = '${UserId}' AND
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
    ],
  };
};
