CREATE OR REPLACE FUNCTION proc_get_friends (p_user_id UUID, p_req_id UUID, p_limit INT, p_offSet INT) RETURNS TABLE ("total" INT, "data" JSON)
LANGUAGE plpgsql
AS $$
BEGIN
RETURN QUERY
SELECT
 (SELECT "amountOfFriend" 
  FROM "Users" 
  WHERE "Users"."id"= p_user_id
  ) as "total",
(
SELECT 
json_agg(
  json_build_object(
    'id', "U"."id",
    'firstName', "U"."firstName",
    'lastName', "U"."lastName",
    'profilePicture', "U"."profilePicture",
    'email', "U"."email",
    'amountOfFollower',"U"."amountOfFollower",
    'amountOfFollowing',"U"."amountOfFollowing",
    'amountOfFriend',"U"."amountOfFriend",
    'isFriend', "U"."isFriend",
    'iFollow',"U"."iFollow"
--     'IsAFollower',"IsAFollower"
    )) AS data
  FROM ( 
  SELECT DISTINCT "Us"."id", "Us"."firstName", "Us"."lastName", "Us"."profilePicture", "Us"."email","Us"."amountOfFollower","Us"."amountOfFollowing" ,"Us"."amountOfFriend" ,
   
   (
    EXISTS
    (
     SELECT 1 FROM "User_friends" 
     WHERE ("User_friends"."UserId" = p_req_id AND "User_friends"."friendId" = "Us"."id") 
     OR ("User_friends"."UserId" = "Us"."id" AND "User_friends"."friendId" = p_req_id)
     )
    ) AS "isFriend", 
    (
      EXISTS
      (
        SELECT 1 
        FROM "User_Follower"  
        WHERE "User_Follower"."UserId" = "Us"."id" AND "User_Follower"."FollowerId" = p_req_id 
       )
    ) AS "iFollow"

   
  FROM "Users" AS "Us"
  
  WHERE "Us"."id" IN 
	( 
		SELECT "UserId" AS "id"
		FROM "User_friends"
		WHERE "User_friends"."friendId" = p_user_id  -- Parameterized user ID
		
		UNION DISTINCT
		SELECT "friendId" AS "id"
		FROM "User_friends"
		WHERE "User_friends"."UserId" = p_user_id
		OFFSET p_offSet
		LIMIT p_limit
/* OFFSET p_offSet */
	)) as "U");

END;
$$;