CREATE OR REPLACE FUNCTION get_phone_verification_code(user_id VARCHAR, phone_number VARCHAR)
RETURNS VARCHAR AS $$
DECLARE
    v_phone_id INT;
    v_code VARCHAR(10);
    v_expiry_duration INT;
    v_code_sent_time TIMESTAMP;
    v_new_code VARCHAR(4);
    v_error_message TEXT;
BEGIN
    -- Check if phone number is associated with the user
    SELECT phone_id, verification_code, code_sent_time
    INTO v_phone_id, v_code, v_code_sent_time
    FROM UserPhoneVerifications
    WHERE user_id = user_id AND phone_id = (SELECT phone_id FROM PhoneNumbers WHERE phone_number = phone_number);

    -- If no association is found, raise an error using standardized error messages
    IF NOT FOUND THEN
        SELECT error_message INTO v_error_message FROM error_codes WHERE error_code = 'USR_PHN_ASC';
        IF v_error_message IS NULL THEN
            v_error_message := 'Uncategorized error';
        END IF;
        RAISE EXCEPTION '%', v_error_message;
    END IF;

    -- Get the expiry duration for phone verifications
    SELECT expiry_duration INTO v_expiry_duration FROM expiry_time WHERE request_type = 'PHN_VRF';

    -- Check if the current code has expired
    IF v_code_sent_time + (v_expiry_duration * interval '1 minute') < NOW() THEN
        -- Generate a new 4-digit code
        v_new_code := LPAD(FLOOR(RANDOM() * 9999)::TEXT, 4, '0');

        -- Update the code in the database
        UPDATE UserPhoneVerifications
        SET verification_code = v_new_code, code_sent_time = NOW()
        WHERE user_id = user_id AND phone_id = v_phone_id;

        -- Return the new code
        RETURN v_new_code;
    ELSE
        -- Return the existing code if it has not expired
        RETURN v_code;
    END IF;
END;
$$ LANGUAGE plpgsql;