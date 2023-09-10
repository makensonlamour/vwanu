
    EXISTS (
        SELECT 1
        FROM "CommunityUsers"
        WHERE "CommunityId" = ':communityId'
        AND "UserId" = ':userId'
    )
