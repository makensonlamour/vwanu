CREATE OR REPLACE FUNCTION delete_phone_association(user_id VARCHAR, phone_number VARCHAR)
RETURNS TEXT AS $$
DECLARE
    v_phone_id INT;
    v_error_message TEXT;
BEGIN
    -- Retrieve the phone_id for the given phone number
    SELECT phone_id INTO v_phone_id FROM PhoneNumbers WHERE phone_number = phone_number;

    -- If no phone number is found, retrieve and return the standardized error message
    IF v_phone_id IS NULL THEN
        SELECT error_message INTO v_error_message FROM ErrorCodes WHERE error_code = 'NO_PHONE_FOUND';
        IF v_error_message IS NULL THEN
            RETURN 'No such phone number exists.';
        ELSE
            RETURN v_error_message;
        END IF;
    END IF;

    -- Check if the phone number is associated with the user
    IF NOT EXISTS (SELECT 1 FROM UserPhoneVerifications WHERE user_id = user_id AND phone_id = v_phone_id) THEN
        SELECT error_message INTO v_error_message FROM ErrorCodes WHERE error_code = 'PHONE_NOT_ASSOCIATED';
        IF v_error_message IS NULL THEN
            RETURN 'Phone number not associated with the user.';
        ELSE
            RETURN v_error_message;
        END IF;
    ELSE
        -- Delete the association
        DELETE FROM UserPhoneVerifications WHERE user_id = user_id AND phone_id = v_phone_id;

        -- Check if other users are still associated with this phone number
        IF NOT EXISTS (SELECT 1 FROM UserPhoneVerifications WHERE phone_id = v_phone_id) THEN
            -- If no other users are associated, consider deleting the phone number from PhoneNumbers
            DELETE FROM PhoneNumbers WHERE phone_id = v_phone_id;
            RETURN 'Phone number deleted from the system.';
        ELSE
            RETURN 'Phone number association with the user deleted.';
        END IF;
    END IF;
END;
$$ LANGUAGE plpgsql;