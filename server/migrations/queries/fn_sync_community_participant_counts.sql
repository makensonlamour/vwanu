CREATE OR REPLACE FUNCTION fn_sync_community_participant_counts()
RETURNS TRIGGER
AS $$
DECLARE p_role varchar(10);
BEGIN


IF TG_OP = 'INSERT' THEN
-- Increment the admin| member count. 
	SELECT "name" from "CommunityRoles" 
	INTO p_role
	WHERE "CommunityRoles".id= NEW."CommunityRoleId";
    
	IF p_role ='member' THEN
		UPDATE "Communities"
		SET "numMembers" = "numMembers" + 1
		WHERE id = NEW."CommunityId";
	ELSIF p_role ='admin' THEN
		UPDATE "Communities"
		SET "numAdmins" = "numAdmins" + 1
		WHERE id = NEW."CommunityId";
	END IF;
	
ELSIF TG_OP = 'DELETE' THEN
      -- Decrement the the admin| member count.
      SELECT "name" from "CommunityRoles" 
	  INTO p_role
	  WHERE "CommunityRoles".id= OLD."CommunityRoleId";
	  IF p_role ='member' THEN
      	 UPDATE "Communities"
         SET "numMembers" = "numMembers" - 1
         WHERE id = OLD."CommunityId";
      ELSIF p_role ='admin' THEN
		UPDATE "Communities"
		SET "numAdmins" = "numAdmins" - 1
		WHERE id = OLD."CommunityId";
   	END IF;
   END IF;
RETURN null;
END; 
$$ LANGUAGE "plpgsql";

