CREATE TRIGGER tr_control_community_bans
    BEFORE INSERT ON "community_bans"
    FOR EACH ROW
    EXECUTE FUNCTION fn_control_community_bans();