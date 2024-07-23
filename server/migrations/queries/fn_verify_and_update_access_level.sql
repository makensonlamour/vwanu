CREATE OR REPLACE FUNCTION fn_verify_and_update_access_level()
RETURNS TRIGGER AS $$
DECLARE
    giver_rank INT;
    new_level_rank INT;
    receiver_rank INT;
BEGIN
    -- Get the rank of the current level of the user granting the access
    SELECT level_rank INTO giver_rank
    FROM "Users" as users 
	JOIN "CommunityRoles" AS access_levels 
	ON users.access_role_id = access_levels.id
    WHERE users.id = NEW.granted_by;

	-- Get the current rank of the receiver
    SELECT level_rank INTO receiver_rank
    FROM "Users" as users 
    JOIN "CommunityRoles" AS access_levels 
	ON users.users.access_role_id = access_levels.id
    WHERE users.user_id = NEW.granted_to;

    -- Get the rank of the new access level
    SELECT level_rank INTO new_level_rank
    FROM "CommunityRoles" AS access_levels 
    WHERE level_id = NEW.new_access_level;

    -- Verify ranks: Giver must have a lower rank number (higher privilege)
    -- Verify ranks:
    -- 1. Giver must have a lower rank (higher privilege) than the new level
    -- 2. The new level must be higher (lower privilege) than the receiver's current rank
    IF giver_rank > new_level_rank THEN
        RAISE EXCEPTION 'Access level change denied. Giver does not have enough privilege to grant this level.';
    ELSIF giver_rank > receiver_rank THEN
        RAISE EXCEPTION 'Access level change denied. Receiver already has a higher or equal privilege.';
    ELSE
        -- Update the access level of the recipient user if all conditions are met
        UPDATE "Users"
        SET access_role_id = NEW.access_level_id
        WHERE id = NEW.granted_to;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;