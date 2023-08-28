CREATE TRIGGER tr_sync_community_participant_counts
    AFTER INSERT OR DELETE ON "CommunityUsers"
    FOR EACH ROW
    EXECUTE FUNCTION fn_sync_community_participant_counts();