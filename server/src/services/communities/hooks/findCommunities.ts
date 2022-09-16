import { QueryTypes } from '@sequelize/core';
import { HookContext } from '@feathersjs/feathers';
import { GeneralError } from '@feathersjs/errors';

export default async (context: HookContext) => {
  const { app } = context;
  const Sequelize = app.get('sequelizeClient');


  const query2 = `SELECT 
  "C"."name",
  "C"."description", 
  "C"."privacyType",
  "C"."id",
  "C"."UserId",
  "C"."profilePicture",
  "C"."coverPicture",
  COUNT(DISTINCT CASE WHEN "CU"."CommunityId"="C"."id" THEN "CU"."UserId" END)::int As "amountOfMembers" , 
  (SELECT 
    json_build_object(
     'id', "CU"."UserId",
     'role',"CR"."name",
     'roleId',"CR"."id"
    ) 
    FROM "CommunityUsers" AS "CU"
    INNER JOIN "CommunityRoles" AS "CR" ON "CR"."id" = "CU"."CommunityRoleId"
    WHERE "CU"."CommunityId"="C"."id" and "CU"."UserId"='${context.params.User.id}'
  ) as "IsMember",


(SELECT 
  json_agg(
    json_build_object('id', "U"."id",
      'firstName',"U"."firstName",
      'lastName',"U"."lastName",
      'profilePicture',"U"."profilePicture",
      'createdAt',"U"."createdAt",
      'updatedAt',"U"."updatedAt",
      'role',"CR"."name",
      'roleId',"CR"."id"
    )
  ) 
  FROM "CommunityUsers" AS "CU" 
  INNER JOIN "CommunityRoles" AS "CR" ON "CR"."id" = "CU"."CommunityRoleId"
  INNER JOIN "Users" AS "U" ON "CU"."UserId" = "U"."id"
  WHERE "CU"."UserId"="U"."id" AND "CU"."CommunityId"="C"."id"
  LIMIT 10
  )as "members",

(SELECT 
  json_agg(
    json_build_object(
      'name',"I"."name",
      'id',"I"."id"
  )) FROM "Interests" AS "I" 
  INNER JOIN "Community_Interest" AS "CI" ON "CI"."InterestId" = "I"."id"
  WHERE "CI"."CommunityId"="C"."id"
)as "Interests"

FROM "Communities" AS "C"
INNER JOIN "CommunityUsers" as "CU" ON "CU"."CommunityId"="C"."id"
 WHERE  "C"."privacyType" <> 'hidden' OR ("CU"."UserId"='${context.params.User.id}' AND "C"."privacyType" = 'hidden')
GROUP BY "C"."name","C"."description", "C"."id" 
LIMIT 20
  `;


  try {
    const communities = await Sequelize.query(query2, {
      type: QueryTypes.SELECT,
    });

    context.result = communities;
  } catch (error) {
    throw new GeneralError(error);
  }
  return context;
};
