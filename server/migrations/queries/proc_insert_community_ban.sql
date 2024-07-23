CREATE OR REPLACE PROCEDURE insert_community_ban(
    p_user_id UUID,
    p_community_id UUID,
    p_by_user_id UUID,
    p_comment TEXT,
    p_until TIMESTAMP
)
LANGUAGE plpgsql AS $$
DECLARE
    v_role TEXT;
    v_existing_ban_until TIMESTAMP;
BEGIN
    -- Check if the user trying to insert the ban (by_user_id) has the correct role
    SELECT name
    INTO v_role 
    FROM "CommunityRoles" AS roles
    INNER JOIN community_users ON community_users.community_role_id = roles.id
    WHERE user_id = p_by_user_id;
    
    IF v_role IS NULL THEN
        RAISE EXCEPTION 'Error getting the role of the user trying to insert a ban';
    END IF;
    
    IF v_role != 'moderator' AND v_role != 'admin' THEN
        RAISE EXCEPTION 'User does not have the required role to insert a ban';
    END IF;
    
    -- Check if a ban already exists for this user and community with 'until' date in the future
    SELECT until INTO v_existing_ban_until
    FROM community_bans
    WHERE user_id = p_user_id AND community_id = p_community_id AND until > NOW();
    
    IF v_existing_ban_until IS NOT NULL THEN
        RAISE EXCEPTION 'A ban for this user in this community with a future "until" date already exists';
    END IF;
    
    -- If p_until is NULL, set it to 200 years in the future
    IF p_until IS NULL THEN
        p_until := NOW() + INTERVAL '200 years';
    END IF;

    -- If comment is not provided, set a custom message based on the role
    IF p_comment IS NULL THEN
        p_comment := v_role || ' banned this user for 200 years';
    END IF;
    
    -- Insert the new ban
    INSERT INTO community_bans (user_id, community_id, by_user_id, comment, until, created_at)
    VALUES (p_user_id, p_community_id, p_by_user_id, p_comment, p_until, CURRENT_TIMESTAMP);

    Raise notice 'User % banned from community %', p_user_id, p_community_id;
    
END;
$$;
