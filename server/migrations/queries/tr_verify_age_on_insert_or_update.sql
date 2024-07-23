CREATE TRIGGER verify_age_on_update
BEFORE INSERT OR UPDATE ON "Users"
FOR EACH ROW
EXECUTE FUNCTION fn_verify_age_and_reject_under_13();