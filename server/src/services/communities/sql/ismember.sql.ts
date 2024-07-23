export default `
    EXISTS (
        SELECT 1
        FROM community_users
        WHERE "CommunityId" = ':communityId'
        AND "UserId" = ':userId'
    )
`;
