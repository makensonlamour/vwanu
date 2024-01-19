CREATE OR REPLACE FUNCTION fn_join_community_invitation_update()
RETURNS TRIGGER
AS $$
DECLARE p_role uuid;
BEGIN


IF TG_OP = 'UPDATE' THEN
-- Insert the new user in the community_users table
	IF( NEW.response = true) THEN
		-- Check if the user is already a member of the community
		SELECT community_role_id
		INTO p_role
		FROM community_users
		WHERE user_id = NEW."guestId" AND 
		community_id = NEW."CommunityId";

		IF p_role IS NULL THEN
			INSERT INTO community_users (user_id, community_id, community_role_id, created_at)
			VALUES (NEW."guestId", NEW."CommunityId", NEW."CommunityRoleId", CURRENT_TIMESTAMP);
		ELSE

		-- check if it is the same role as the one in the community_users table

			IF p_role != NEW."CommunityRoleId" THEN
				UPDATE community_users
				SET community_role_id = NEW."CommunityRoleId"
				WHERE user_id = NEW."guestId" AND community_id = NEW."CommunityId";
			
			ELSE 
				RAISE EXCEPTION 'User is already a member of the community';
			END IF;
			END IF;

			
		END IF;
	END IF;
    RETURN null;
END;
$$ LANGUAGE plpgsql;

