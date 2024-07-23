--DROP FUNCTION fn_get_community_by_id(uuid,uuid) 
CREATE OR REPLACE FUNCTION public.fn_get_community_by_id(p_user_id uuid, p_community_id uuid)
 RETURNS TABLE(comm_id uuid, community_name text, description text,  "profilePicture" text, "coverPicture" text, "numMembers" integer, "numAdmins" integer,  "Interests" JSONB[], "canUserPost" boolean, "canUserInvite" boolean, "canUserUploadDoc" boolean, "canUserUploadPhotos" boolean,"canUserUploadVideo" boolean, "canMessageUserInGroup" boolean, "isMember" jsonb, "pendingInvitation" jsonb[], "haveDiscussionForum" boolean, creator jsonb, "commPrivacyType" text, "commUserId" uuid)
 LANGUAGE plpgsql
AS $function$
DECLARE
    v_is_banned BOOLEAN;
    v_is_creator BOOLEAN;
    v_is_public BOOLEAN;
	v_is_member BOOLEAN;
    v_role_id UUID;
    v_role_name TEXT;
    v_community_record RECORD;
BEGIN
    -- Check if the user is banned
    SELECT EXISTS(
        SELECT 1 FROM community_bans
        WHERE user_id = p_user_id 
        AND community_id = p_community_id 
        AND (until IS NULL OR until > NOW())
    ) INTO v_is_banned;

    IF v_is_banned THEN
        RAISE EXCEPTION 'User is banned from the community';
        RETURN;
    END IF;

    -- Check if user is the creator
    SELECT EXISTS(
        SELECT 1 FROM "Communities"
        WHERE id = p_community_id 
        AND "UserId" = p_user_id
    ) INTO v_is_creator;

    -- Check if the community is public
    SELECT EXISTS(
        SELECT 1 FROM "Communities"
        WHERE id = p_community_id 
        AND "privacyType" = 'public'
    ) INTO v_is_public;

    -- Fetch the user's role if they are a member of the community
    SELECT community_role_id, name 
    INTO v_role_id, v_role_name
    FROM community_users 
    JOIN "CommunityRoles"  ON "CommunityRoles"."id" = community_users.community_role_id
    WHERE user_id = p_user_id AND community_id = p_community_id;


	  -- Check if user is a member of the community
     SELECT EXISTS(
        SELECT 1 FROM community_users
        WHERE user_id = p_user_id 
        AND community_id = p_community_id
    ) INTO v_is_member;
    
    -- Fetch community if any of the conditions is met
    IF v_is_creator OR v_is_public OR v_is_member THEN
        SELECT * INTO v_community_record
        FROM "Communities"
        WHERE id = p_community_id;

        comm_id:= v_community_record.id;
        community_name := v_community_record.name;
		description:= v_community_record.description;
		"commUserId":=v_community_record."UserId";
        "profilePicture" := v_community_record."profilePicture";
        "coverPicture" := v_community_record."coverPicture";
        "numMembers" := v_community_record."numMembers";
        "numAdmins" := v_community_record."numAdmins";
		"commPrivacyType":=v_community_record."privacyType";
        "haveDiscussionForum":= v_community_record."haveDiscussionForum";

        -- Assuming you have the interests in a table, fetch them as an array
 

        SELECT array_agg(jsonb_build_object('id', i.id, 'name', i."name" )) INTO "Interests"
        FROM "Community_Interest" AS ci
        INNER JOIN "Interests" AS i ON i.id = ci."InterestId"
        WHERE "CommunityId" = p_community_id;


        "canUserPost" := v_is_member AND (v_community_record."canInPost" = 'E' OR (v_community_record."canInPost" = 'M' AND (v_role_name = 'moderator' OR v_role_name = 'admin')) OR (v_community_record."canInPost" = 'A' AND v_role_name = 'admin')) OR v_is_creator;

        "canUserInvite" := v_is_member AND (v_community_record."canInvite" = 'E' OR (v_community_record."canInvite" = 'M' AND (v_role_name = 'moderator' OR v_role_name = 'admin')) OR (v_community_record."canInvite" = 'A' AND v_role_name = 'admin')) OR v_is_creator;

        "canUserUploadDoc" := v_is_member AND (v_community_record."canInUploadDoc" = 'E' OR (v_community_record."canInUploadDoc" = 'M' AND (v_role_name = 'moderator' OR v_role_name = 'admin')) OR (v_community_record."canInUploadDoc" = 'A' AND v_role_name = 'admin')) OR v_is_creator;

        "canUserUploadPhotos" := v_is_member AND (v_community_record."canInUploadPhotos" = 'E' OR (v_community_record."canInUploadPhotos" = 'M' AND (v_role_name = 'moderator' OR v_role_name = 'admin')) OR (v_community_record."canInUploadPhotos" = 'A' AND v_role_name = 'admin')) OR v_is_creator;

"canUserUploadVideo" := v_is_member AND (v_community_record."canInUploadVideo" = 'E' OR (v_community_record."canInUploadVideo" = 'M' AND (v_role_name = 'moderator' OR v_role_name = 'admin')) OR (v_community_record."canInUploadVideo" = 'A' AND v_role_name = 'admin')) OR v_is_creator;

"canMessageUserInGroup" := v_is_member AND (v_community_record."canMessageInGroup" = 'E' OR (v_community_record."canMessageInGroup" = 'M' AND (v_role_name = 'moderator' OR v_role_name = 'admin')) OR (v_community_record."canMessageInGroup" = 'A' AND v_role_name = 'admin')) OR v_is_creator;

        IF v_role_id IS NOT NULL THEN
            "isMember" := jsonb_build_object('roleId', v_role_id, 'role', v_role_name,'id', p_user_id);
        END IF;

        SELECT array_agg(json_build_object(
            'id', "INV"."id",
            'role',"R"."name",
            'roleId',"R"."id",
            'createdAt',"INV"."createdAt",
            'updatedAt',"INV"."updatedAt",
            'hostId',"INV"."hostId",
            'guestId',"INV"."guestId"
        )) INTO "pendingInvitation"
       FROM "CommunityInvitationRequests" AS "INV" 
       INNER JOIN "CommunityRoles" AS "R" ON "R"."id" = "INV"."CommunityRoleId"
       WHERE "INV"."CommunityId"=p_community_id AND "INV"."guestId"=p_user_id AND "INV"."response" IS NULL;

       SELECT jsonb_build_object('id', u."id", 'firstName', u."firstName", 'lastName', u."lastName", 'profilePicture', u."profilePicture" ) INTO creator
       FROM "Users" AS u
       WHERE id = v_community_record."UserId";

        RETURN NEXT;
    ELSE
        RAISE EXCEPTION 'User does not have the permission to view the community % and %', v_is_creator, v_is_public;
        RETURN;
    END IF;
END;
$function$
