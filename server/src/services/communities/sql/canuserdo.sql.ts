export default `
  (  SELECT 
    
        (CASE 
            WHEN "CR"."name" = 'admin'
            --AND "CR"."id" = "CU"."CommunityRoleId"
            --AND "CU"."CommunityId" = "Community"."id"
            -- AND "CU"."UserId" = ':userId' 
            THEN true
            WHEN "Community".":field" = 'E'
            -- AND "CU"."UserId" = ':userId'
            -- AND "CU"."CommunityId" = "Community"."id" 
            THEN true
            WHEN "Community".":field" = 'M'
            -- AND "CU"."UserId" = ':userId'
            -- AND "CU"."CommunityId" = "Community"."id"
            -- AND "CR"."id" = "CU"."CommunityRoleId"
            AND ("CR"."name"='admin' OR "CR"."name"='moderator')
            THEN true
            WHEN "Community".":field" = 'A'
            -- AND "CR"."id" = "CU"."CommunityRoleId" 
            -- AND "CU"."CommunityId" = "Community"."id"
            AND "CR"."name"='admin'
            -- AND "CU"."UserId"=':userId' 
            THEN true
            ELSE false
      END) 
    FROM  "CommunityUsers" AS "CU"
    INNER JOIN "CommunityRoles" AS "CR" ON "CU"."CommunityRoleId" = "CR"."id"
    WHERE "CU"."CommunityId" = "Community"."id" AND "CU"."UserId" = ':userId')

        

`;
