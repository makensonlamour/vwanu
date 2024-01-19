CREATE TRIGGER tr_auto_join_community
AFTER INSERT ON "Communities"
FOR EACH ROW EXECUTE FUNCTION fn_auto_join_community();