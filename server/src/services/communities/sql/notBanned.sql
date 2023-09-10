NOT EXISTS(
    SELECT 1
    FROM community_bans
    WHERE community_bans.community_id = ':communityId'
    AND community_bans.user_id = ':userId'
)