CREATE OR REPLACE PROCEDURE public.join_community(p_user_id uuid, p_community_id uuid)
 LANGUAGE plpgsql
AS $$
DECLARE
    v_member_role uuid;
    v_existing_ban_until TIMESTAMP;
	v_is_already_member BOOLEAN;
	v_is_public BOOLEAN; 
BEGIN
	-- Check if the community the user is trying to join is public 
	IF NOT EXISTS(
		SELECT 1
		FROM "Communities" 
		WHERE "Communities"."id"= p_community_id AND "Communities"."privacyType"='public') THEN
		
        RAISE EXCEPTION 'Only public community can be joind without an invitation';
    END IF;
	
	 -- Check if a ban already exists for this user and community with 'until' date in the future
    SELECT until INTO v_existing_ban_until
    FROM community_bans
    WHERE user_id = p_user_id AND community_id = p_community_id AND until > NOW();
    
    IF v_existing_ban_until IS NOT NULL THEN
        RAISE EXCEPTION 'You are banned you cannot join/rejoin this community now';
    END IF;

    -- Get the member role id
    SELECT id
    INTO v_member_role  
    FROM "CommunityRoles" AS r
    WHERE r.name = 'member';
    
    IF v_member_role IS NULL THEN
        RAISE EXCEPTION 'Member role configuration error: member role not found';
    END IF;

	-- CHECK IF NOT ALREADY A MEMBER IN THIS COMMUNITY
	IF EXISTS(
	 SELECT 1 
	 FROM community_users
	 WHERE community_users.user_id= p_user_id AND community_users.community_id= p_community_id) THEN
	 RAISE EXCEPTION 'You are already a member in this community ';
	END IF;
    
    -- Insert a new community User
    INSERT INTO community_users (user_id, community_id, community_role_id,created_at)
    VALUES (p_user_id, p_community_id, v_member_role, CURRENT_TIMESTAMP);

	RAISE NOTICE 'SUCCESSFULY ADDED TO THE COMMUNITY';
    
END;
$$