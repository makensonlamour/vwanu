CREATE OR REPLACE FUNCTION update_primary_phone(user_id VARCHAR, new_phone_number VARCHAR)
RETURNS TEXT AS $$
DECLARE
    v_old_phone_id INT;
    v_new_phone_id INT;
    v_error_message TEXT;
BEGIN
    -- Retrieve current primary phone_id
    SELECT primary_phone_id INTO v_old_phone_id FROM Users WHERE user_id = user_id;
    
    -- Check if the new phone number already exists in the database
    SELECT phone_id INTO v_new_phone_id FROM PhoneNumbers WHERE phone_number = new_phone_number;
    
    -- If new phone number does not exist, return an error
    IF v_new_phone_id IS NULL THEN
        SELECT error_message INTO v_error_message FROM ErrorCodes WHERE error_code = 'PHONE_NOT_FOUND';
        IF v_error_message IS NULL THEN
            RETURN 'New phone number does not exist in our records.';
        ELSE
            RETURN v_error_message;
        END IF;
    END IF;
    
    -- Check if the new phone number is already the primary phone number
    IF v_old_phone_id = v_new_phone_id THEN
        RETURN 'This phone number is already your primary phone number.';
    END IF;

    -- Disassociate the old primary phone number
    DELETE FROM UserPhoneVerifications WHERE user_id = user_id AND phone_id = v_old_phone_id;

    -- Associate the new phone number with the user
    INSERT INTO UserPhoneVerifications (user_id, phone_id, verification_code, code_sent_time)
    VALUES (user_id, v_new_phone_id, '', NOW()); -- Assuming a verification process might follow

    -- Update the primary phone ID in the Users table
    UPDATE Users SET primary_phone_id = v_new_phone_id WHERE user_id = user_id;

    RETURN 'Primary phone number updated successfully.';
END;
$$ LANGUAGE plpgsql;