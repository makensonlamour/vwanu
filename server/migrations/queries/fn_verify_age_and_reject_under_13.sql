CREATE OR REPLACE FUNCTION fn_verify_age_and_reject_under_13()
RETURNS TRIGGER AS $$
DECLARE
    calculated_age INTEGER;
BEGIN
    IF (NEW.birthday IS NOT NULL AND OLD.birthday IS DISTINCT FROM NEW.birthday ) THEN
        -- Calculate age in years
        calculated_age := DATE_PART('year', AGE(CURRENT_DATE, NEW.birthday::date));

        -- Check if under 13 years
        IF calculated_age < 13 THEN
            RAISE EXCEPTION 'User must be 13 years or older. Given age: % years is not accepted.', calculated_age;
        ELSE
            IF OLD.active_status IS DISTINCT FROM true THEN
                NEW.active_status = true;
            END IF;
        END IF;
    END IF;

    -- If age is 13 or older, or birthday has not changed, simply proceed without making changes
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;
