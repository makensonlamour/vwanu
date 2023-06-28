CREATE OR REPLACE FUNCTION proc_get_friends (p_user_id UUID, p_limit INT, p_offSet INT) RETURNS TABLE ("total" INT, "data" JSON)
LANGUAGE plpgsql
AS $$
BEGIN
RETURN QUERY
SELECT
(SELECT "amountOfFriend" 
       FROM "Users" 
       WHERE "Users"."id"= p_user_id
       ) as "total",
(SELECT 
json_agg(
 json_build_object(
   'id', "U"."id",
    'firstName', "U"."firstName",
    'lastName', "U"."lastName",
    'profilePicture', "U"."profilePicture",
  'email', "U"."email")) AS data
  FROM ( SELECT * FROM "Users"  WHERE "id" IN
( 
SELECT "UserId" AS "id"
FROM "User_friends"
WHERE "User_friends"."friendId" = p_user_id  -- Parameterized user ID
UNION
SELECT "friendId" AS "id"
FROM "User_friends"
WHERE "User_friends"."UserId" = p_user_id
LIMIT p_limit
/* OFFSET p_offSet */
)) as "U");

END;
$$;