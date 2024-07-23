CREATE OR REPLACE FUNCTION fn_add_or_associate_phone(p_user_id UUID, p_phone_number VARCHAR, country_code uuid)
 RETURNS TEXT
 LANGUAGE plpgsql
AS $function$
DECLARE
    v_phone_id INT;
    v_error_message TEXT;
    v_new_code TEXT;
BEGIN
    -- Check if the phone number exists
    SELECT id INTO v_phone_id FROM phones WHERE phones.phone_number = p_phone_number;

    -- If the phone number does not exist, insert it
    IF v_phone_id IS NULL THEN
        INSERT INTO phones(phone_number, country_code,created_at,updated_at)
        VALUES(p_phone_number, country_code,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)
        RETURNING id INTO v_phone_id;
    END IF;
    
    -- Check if the phone number is already associated with the user
    IF EXISTS (SELECT 1 FROM user_phone_verifications WHERE user_phone_verifications.user_id = p_user_id AND user_phone_verifications.phone_id = v_phone_id) THEN
        -- Retrieve error message for already associated phone
        SELECT error_message INTO v_error_message FROM error_codes WHERE error_code = 'PHN_ASSOC_ERR';
        IF v_error_message IS NULL THEN
            v_error_message := 'Phone is already associated with the user';
        END IF;
        RAISE EXCEPTION '%', v_error_message;
    ELSE
     -- Generate a new 4-digit verification code
        v_new_code := LPAD(FLOOR(RANDOM() * 9999)::TEXT, 4, '0');
        -- Associate the phone number with the user
        INSERT INTO user_phone_verifications(user_id, phone_id, verification_code, code_sent_time,created_at,updated_at)
        VALUES(p_user_id, v_phone_id, v_new_code, NOW(),CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);
		RETURN v_new_code;
    END IF;
END;
$function$


