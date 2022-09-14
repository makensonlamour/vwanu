import { QueryTypes } from '@sequelize/core';
import { HookContext } from '@feathersjs/feathers';
import { GeneralError } from '@feathersjs/errors';

export default async (context: HookContext) => {
  const { app } = context;
  const Sequelize = app.get('sequelizeClient');
  const query = `
        SELECT "C"."name","C"."description", "C"."privacyType","CU"."CommunityId" AS "id", "C"."UserId", 
        COUNT(DISTINCT CASE WHEN "CU"."CommunityId"="C"."id" THEN "CU"."UserId" END) As "amountOfMembers",
            (SELECT json_agg(
            json_build_object('id', "U"."id",
            'firstName',"U"."firstName",
            'lastName',"U"."lastName",
            'profilePicture',"U"."profilePicture",
            'createdAt',"U"."createdAt",
            'updatedAt',"U"."updatedAt",
            'role',"CR"."name",
            'roleId',"CR"."id"
            )) from "Users" as "U" 
             INNER JOIN "CommunityRoles" AS "CR" ON "CR"."id" = "CU"."CommunityRoleId"
            WHERE "U"."id"="CU"."UserId" GROUP BY "CU"."UserId", "U"."firstName", "U"."lastName" , "U"."profilePicture", "U"."createdAt","U"."updatedAt", "CU"."CommunityRoleId","CR"."name" LIMIT 10)as "members",
           json_agg( 
            json_build_object(
              'id', "I"."id",
              'name',"I"."name"
              )) as "Interests",
              (SELECT 
           json_build_object(
              'id', "CU"."UserId",
               'role',"CR"."name",
              'roleId',"CR"."id"
              ) from "CommunityUsers" as "CU" 
              INNER JOIN "CommunityRoles" AS "CR" ON "CR"."id" = "CU"."CommunityRoleId"
              where "CU"."CommunityId"="C"."id" and "CU"."UserId"='${context.params.User.id}') as "IsMember"
            FROM "CommunityUsers" AS "CU" 
            INNER JOIN "Users" AS "U" ON "U"."id" = "CU"."UserId" 
            INNER JOIN "Communities" AS "C" ON "C"."id"="CU"."CommunityId" 
            INNER JOIN "Community_Interest" AS "CI" ON "CI"."CommunityId" = "C"."id" 
            INNER JOIN "Interests" AS "I" ON "I"."id" = "CI"."InterestId"
            INNER JOIN "CommunityRoles" AS "CR" ON "CR"."id" = "CU"."CommunityRoleId"
            WHERE  "C"."privacyType" <> 'hidden' OR ("CU"."UserId"='${context.params.User.id}' AND "C"."privacyType" = 'hidden')
            GROUP BY "C"."name","C"."description", "C"."id" ,"CU"."CommunityId", "CU"."UserId", "U"."firstName", "U"."lastName" , "U"."profilePicture", "U"."createdAt","U"."updatedAt","CU"."CommunityRoleId"
             LIMIT 20`;

  try {
    const communities = await Sequelize.query(query, {
      type: QueryTypes.SELECT,
    });
    context.result = communities;
  } catch (error) {
    throw new GeneralError(error);
  }
  return context;
};
