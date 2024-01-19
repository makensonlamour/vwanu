CREATE OR REPLACE FUNCTION fn_auto_join_community()
RETURNS TRIGGER AS $$
DECLARE 
  admin_role_id UUID;
BEGIN
    SELECT id 
    INTO admin_role_id 
    FROM "CommunityRoles"
    WHERE "name" = 'admin';

    INSERT INTO community_users (user_id, community_id, community_role_id, created_at)
    VALUES (NEW."UserId", NEW.id, admin_role_id, CURRENT_TIMESTAMP);
    RETURN NEW;
  
END;
$$ LANGUAGE plpgsql;