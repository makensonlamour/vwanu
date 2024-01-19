CREATE OR REPLACE PROCEDURE public.proc_demote_community_member(p_requester_id uuid, p_user_id uuid, p_community_id uuid p_demoting_role_id uuid)
 LANGUAGE plpgsql
AS $$
DECLARE 
 	v_community_creator_id uuid;
    v_requester_role varchar(20);
    v_user_role varchar(20);
BEGIN

-- raise an exception if it is a self demotion
IF p_requester_id = p_user_id THEN
	RAISE EXCEPTION 'You cannot demote yourself';
END IF;


-- Get the requester role in the community
SELECT cr."name"
    INTO v_requester_role
    FROM "community_users" cu 
    INNER JOIN "CommunityRoles" cr ON cr.id = cu.community_role_id
    WHERE cu.user_id = p_requester_id AND cu.community_id = p_community_id;

-- Raise an exception if the requester is not an admin or moderator of the community
IF requester_role != 'admin' AND requester_role != 'moderator' THEN
	RAISE EXCEPTION 'You are not an admin or moderator of the community';
END IF;

-- Get the community creator. 
  SELECT "UserId"
    INTO v_community_creator_id
    FROM "Communities"
    WHERE id = p_community_id;

-- if the user is the community creator, than the requester can demote him 
IF p_user_id = v_community_creator_id THEN
	RAISE EXCEPTION 'You cannot demote the creator of the community';
END IF;

--get the person being demoted role 
SELECT cr.name
INTO v_user_role
FROM community_users AS cu
Inner JOIN "CommunityRoles" AS cr on cr.id = cu.community_role_id
WHERE cu.user_id = p_user_id AND cu.community_id = p_community_id;

-- If the requester has a lower role than the person being demoted, then raise an exception
IF requester_role = 'moderator' AND user_role = 'admin' THEN
	RAISE EXCEPTION 'You cannot demote an admin';
END IF;

UPDATE community_users
SET community_role_id = p_demoting_role_id
WHERE user_id = p_user_id AND community_id = p_community_id;

END;
$$