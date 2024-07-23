CREATE OR REPLACE FUNCTION fn_initial_community_assignement()
RETURNS TRIGGER
AS $$
DECLARE
    v_community_role_id uuid;
    v_community_id uuid;
    v_city_id uuid;
    v_city_name text;
BEGIN
    
     -- First, get the cityId from the address of the user
    SELECT "CityId" INTO v_city_id
    FROM "Addresses"
    WHERE id = NEW."AddressId";

    -- Next, get the city name from the Cities table
    SELECT name INTO v_city_name
    FROM "Cities"
    WHERE id = v_city_id;

   -- Check if there's a community for the user's city
    SELECT id INTO v_community_id
    FROM "Communities"
    WHERE "Communities".name = v_city_name
    LIMIT 1;

    -- If there's a community for the user's city, assign the user to the community
    IF v_community_id IS NOT NULL THEN
        IF NOT EXISTS(
            SELECT 1
            FROM community_users
            WHERE user_id = NEW."UserId" AND community_id = v_community_id
        ) THEN
            SELECT id INTO v_community_role_id
            FROM "CommunityRoles"
            WHERE name = 'member';
          
            INSERT INTO community_users (user_id, community_id,community_role_id, created_at)
            VALUES (NEW."UserId", v_community_id, v_community_role_id, NOW());
        END IF;
        END IF;
        
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;
