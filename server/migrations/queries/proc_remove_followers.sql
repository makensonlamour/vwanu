CREATE OR REPLACE PROCEDURE proc_remove_follower(userId UUID, followerId UUID)
LANGUAGE 'plpgsql'
AS $$
BEGIN
    -- Remove the follower from the followers table
    DELETE FROM "public"."User_Follower"
    WHERE "UserId" = userId AND "FollowerId" = followerId;
COMMIT;
END;
$$;