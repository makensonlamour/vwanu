CREATE TRIGGER tr_access_level_change
BEFORE INSERT ON access_level_logs
FOR EACH ROW
EXECUTE FUNCTION fn_verify_and_update_access_level();