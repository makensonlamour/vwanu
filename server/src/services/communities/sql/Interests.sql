(
    SELECT 
        json_agg(
            json_build_object(
                'id', "I"."id",
                'name', "I"."name"
            )
        ) FROM "Interests" AS "I"
        INNER JOIN "Community_Interest" AS "CI" ON "CI"."InterestId" = "I"."id"
        WHERE "CI"."CommunityId"="Community"."id"
)
