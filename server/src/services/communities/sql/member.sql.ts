export default `(SELECT 
    json_build_object
    (
        'role',"CR"."name",
        'roleId',"CR"."id",
        'id', "CU"."UserId"
    ) from "CommunityUsers" as "CU" 
    INNER JOIN "CommunityRoles" AS "CR" ON "CR"."id" = "CU"."CommunityRoleId"
    WHERE "CU"."CommunityId"="Community"."id" and "CU"."UserId"=':userId')
              `;
