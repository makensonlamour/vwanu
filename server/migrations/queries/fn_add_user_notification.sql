CREATE OR REPLACE FUNCTION fn_add_user_notification()
RETURNS TRIGGER AS $$
DECLARE
    v_notification_slug RECORD;
BEGIN
    -- Loop through all notification slugs
    FOR v_notification_slug IN SELECT notification_slug FROM notification_types LOOP
        -- Insert a new row into user_notification_types for each notification type
        INSERT INTO user_notification_types (user_id, notification_slug, text, email, sound)
        VALUES (NEW.id, v_notification_slug.notification_slug, FALSE, FALSE, TRUE);
    END LOOP;

    -- Return the new row to indicate successful insertion
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;