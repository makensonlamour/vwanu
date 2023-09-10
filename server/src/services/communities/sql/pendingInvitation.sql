(
    SELECT 
    json_agg(
        json_build_object(
            'id', "INV"."id",
            'role',"R"."name",
            'roleId',"R"."id",
            'createdAt',"INV"."createdAt",
            'updatedAt',"INV"."updatedAt",
            'hostId',"INV"."hostId",
            'guestId',"INV"."guestId"
        )
    ) FROM "CommunityInvitationRequests" AS "INV" 
    INNER JOIN "CommunityRoles" AS "R" ON "R"."id" = "INV"."CommunityRoleId"
    WHERE "INV"."CommunityId"="Community"."id" AND "INV"."guestId"=':userId' AND "INV"."response" IS NULL
)