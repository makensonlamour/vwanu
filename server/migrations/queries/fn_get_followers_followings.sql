CREATE TYPE user_result AS (
  data "Users",
  total INTEGER
);
CREATE OR REPLACE FUNCTION get_followers_or_following(
    user_id UUID,
    is_followers BOOLEAN DEFAULT TRUE,
    OUT result user_result 
)
-- RETURNS SETOF "Users"
AS $$
BEGIN
    IF is_followers THEN
        --RETURN QUERY
        result.data:=(SELECT u.*
        FROM "Users" u
        INNER JOIN "User_Follower" uf ON u.id = uf."FollowerId"
        WHERE uf."UserId" = user_id);
        result.total:=(SELECT COUNT(*) FROM "Users");
    ELSE
        --RETURN QUERY
        result.data:=(SELECT u.*
        FROM "Users" u
        INNER JOIN "User_Follower" uf ON u.id = uf."UserId"
        WHERE uf."FollowerId" = user_id);
        result.total:=(SELECT COUNT(*) FROM "Users");
    END IF;
END;
$$ LANGUAGE plpgsql;