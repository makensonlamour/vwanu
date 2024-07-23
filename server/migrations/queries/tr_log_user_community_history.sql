CREATE TRIGGER trigger_log_user_community_history
AFTER INSERT OR DELETE ON community_users
FOR EACH ROW EXECUTE FUNCTION log_user_community_history();