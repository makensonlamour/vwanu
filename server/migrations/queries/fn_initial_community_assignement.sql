CREATE OR REPLACE FUNCTION fn_initial_community_assignement()
RETURNS TRIGGER
AS $$

    p_role uuid;
    user_city text;
    community_base_id uuid;
BEGIN
    -- Trigger only on changes to active_status to true and changes in address
    IF (OLD.active_status IS DISTINCT FROM NEW.active_status AND NEW.active_status = true)  THEN
        -- Insert the new user in the community_users table
        -- Retrieve the user's city from the updated address
        SELECT Address.city 
        INTO user_city 
        FROM users
        JOIN EntityAddress ON users.id = EntityAddress.entity_id AND EntityAddress.entity_type = 'user' AND EntityAddress.address_type = 'primary'
        JOIN Address ON EntityAddress.address_id = Address.id AND Address.id = NEW.address_id -- Assuming NEW.address_id represents the new address
        WHERE users.id = NEW.id
        LIMIT 1;

        IF user_city IS NOT NULL THEN
            -- Find a community matching the user's city
            SELECT id 
            INTO community_base_id
            FROM communities 
            WHERE name LIKE user_city
            LIMIT 1;
        END IF;

        -- Retrieve the 'member' role ID
        SELECT id
        INTO p_role
        FROM community_roles
        WHERE name = 'member';

        -- Assign the user to the community if not already assigned
        IF community_base_id IS NOT NULL AND p_role IS NOT NULL AND NOT EXISTS (
            SELECT 1 
            FROM community_users 
            WHERE user_id = NEW.id AND community_id = community_base_id
        ) THEN
            INSERT INTO community_users (user_id, community_id, role_id) -- Assuming there's a role_id column to use
            VALUES (NEW.id, community_base_id, p_role);
        END IF;
    END IF;

    RETURN NULL;
END;
$$ LANGUAGE plpgsql;
