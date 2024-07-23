CREATE TRIGGER trigger_remove_banned_user
AFTER INSERT ON community_bans
FOR EACH ROW EXECUTE FUNCTION remove_banned_user();