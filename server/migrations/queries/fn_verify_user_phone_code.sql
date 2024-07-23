CREATE OR REPLACE FUNCTION fn_verify_user_phone_code(p_user_id VARCHAR, p_phone_number VARCHAR, provided_code VARCHAR)
RETURNS TEXT AS $$
DECLARE
    v_phone_id INT;
    v_stored_code VARCHAR(10);
    v_code_sent_time TIMESTAMP;
    v_expiry_duration INT;
    v_error_message TEXT;
    v_new_code TEXT;
	v_is_verified BOOLEAN;
BEGIN
    -- Retrieve phone ID and the stored verification code
    SELECT p.id, u.verification_code, u.code_sent_time,u.is_verified
    INTO v_phone_id, v_stored_code, v_code_sent_time,v_is_verified
    FROM phones p
    JOIN user_phone_verifications u 
    ON p.id = u.phone_id
    WHERE p.phone_number = p_phone_number ;
    --AND u.user_id = p_user_id;

    -- If no record is found, return an error message
    IF NOT FOUND THEN
        SELECT error_message 
        INTO v_error_message 
        FROM error_codes WHERE error_code = 'NO_CODE_ERR';

        IF v_error_message IS NULL THEN
            RAISE EXCEPTION 'Uncategorized error: NO_CODE_ERR > Phone or verification code not set';
        ELSE
            RAISE EXCEPTION '%', v_error_message;
        END IF;
    END IF;

    IF v_is_verified =TRUE THEN
     SELECT error_message 
     INTO v_error_message 
     FROM error_codes
     WHERE error_code='VER_ALR';
	    IF v_error_message IS NULL THEN
	     RAISE EXCEPTION 'Uncategorized error : VER_ALR Phone already verified';
	     ELSE
	     	RAISE EXCEPTION '%', v_error_message;
		END IF;
    END IF;
    
    

    -- Retrieve expiry duration for the phone verification
    SELECT expiry_duration_minutes INTO v_expiry_duration FROM expiry_times WHERE request_type = 'PHN_ACT';

    -- Check if the code has expired
    IF v_code_sent_time + (v_expiry_duration * interval '1 minute') > NOW() THEN
        -- Generate a new verification code and update the verification time
        v_new_code := LPAD(FLOOR(RANDOM() * 9999)::TEXT, 4, '0');
        UPDATE user_phone_verifications
        SET verification_code = v_new_code, code_sent_time = NOW()
        WHERE phone_id = v_phone_id AND user_id = p_user_id;

        SELECT error_message INTO v_error_message FROM error_codes WHERE error_code = 'CODE_EXPIRED_ERR';
        IF v_error_message IS NULL THEN
            RAISE EXCEPTION 'Uncategorized error: Verfication code has already expired';
        ELSE
            RAISE EXCEPTION '%', v_error_message;
        END IF;
    END IF;

    -- Check if the provided code matches the stored code
     
    IF provided_code <> v_stored_code THEN
    
       SELECT error_message INTO v_error_message FROM error_codes WHERE error_code = 'CODE_INCORRECT_ERR';
        IF v_error_message IS NULL THEN
            RAISE EXCEPTION 'Uncategorized error: CODE_INCORRECT_ERR > The code provided is incorrect % %',v_stored_code,provided_code;
        ELSE
            RAISE EXCEPTION '%,%,%', v_error_message,v_stored_code,provided_code;
        END IF;
    END IF;

UPDATE user_phone_verifications AS us
SET us.is_verified = TRUE
WHERE phone_id = v_phone_id AND user_id = p_user_id;

RETURN 'The code is correct and verified.';
END;
$$ LANGUAGE plpgsql;
