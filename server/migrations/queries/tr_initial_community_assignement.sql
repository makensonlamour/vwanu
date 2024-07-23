CREATE TRIGGER 
tr_initial_community_assignement
    AFTER UPDATE OR INSERT ON "EntityAddresses"
    FOR EACH ROW
    EXECUTE FUNCTION fn_initial_community_assignement();