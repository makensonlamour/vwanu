import { QueryTypes } from '@sequelize/core';
import { BadRequest } from '@feathersjs/errors';
import { HookContext } from '@feathersjs/feathers';

export default async (context: HookContext) => {
  const { app } = context;
  const Sequelize = app.get('sequelizeClient');
  const query = `
          Select "C"."id", "C"."name", "C"."description", "C"."privacyType" , "C"."UserId", "C"."profilePicture", "C"."coverPicture", "C"."haveDiscussionForum","CU"."banned","CU"."bannedDate", 
          (SELECT 
            json_build_object(
             'id', "CU"."UserId",
             'role',"CR"."name",
             'roleId',"CR"."id"
              ) from "CommunityUsers" as "CU" 
            INNER JOIN "CommunityRoles" AS "CR" ON "CR"."id" = "CU"."CommunityRoleId"
            WHERE "CU"."CommunityId"="C"."id" and "CU"."UserId"='${context.params.User.id}' AND "CU"."untilDate" IS NULL
              ) AS "IsMember",
          (CASE 
            WHEN "CR"."name"='admin' 
             AND "CR"."id" = "CU"."CommunityRoleId" 
             AND "CU"."UserId"='${context.params.User.id}' THEN true
            WHEN "C"."canInPost" = 'E' THEN true 
            WHEN "C"."canInPost" = 'M'  
             AND "CR"."id" = "CU"."CommunityRoleId" 
             AND ("CR"."name"='admin' OR "CR"."name"='moderator')
             AND "CU"."UserId"='${context.params.User.id}' THEN true
           WHEN "C"."canInPost" = 'A'  
             AND "CR"."id" = "CU"."CommunityRoleId" 
             AND "CR"."name"='admin'
             AND "CU"."UserId"='${context.params.User.id}' THEN true
           ELSE false
           END
           ) AS "canPost",

          (CASE 
            WHEN "CR"."name"='admin' 
             AND "CR"."id" = "CU"."CommunityRoleId" 
             AND "CU"."UserId"='${context.params.User.id}' THEN true
            WHEN "C"."canInvite" = 'E' THEN true 
            WHEN "C"."canInvite" = 'M'  
             AND "CR"."id" = "CU"."CommunityRoleId" 
             AND ("CR"."name"='admin' OR "CR"."name"='moderator')
             AND "CU"."UserId"='${context.params.User.id}' THEN true
           WHEN "C"."canInvite" = 'A'  
             AND "CR"."id" = "CU"."CommunityRoleId" 
             AND "CR"."name"='admin'
             AND "CU"."UserId"='${context.params.User.id}' THEN true
           ELSE false
           END
           ) AS "canInvite",

          (CASE 
            WHEN "CR"."name"='admin' 
             AND "CR"."id" = "CU"."CommunityRoleId" 
             AND "CU"."UserId"='${context.params.User.id}' THEN true
            WHEN "C"."canInUploadDoc" = 'E' THEN true 
            WHEN "C"."canInUploadDoc" = 'M'  
             AND "CR"."id" = "CU"."CommunityRoleId" 
             AND ("CR"."name"='admin' OR "CR"."name"='moderator')
             AND "CU"."UserId"='${context.params.User.id}' THEN true
           WHEN "C"."canInUploadDoc" = 'A'  
             AND "CR"."id" = "CU"."CommunityRoleId" 
             AND "CR"."name"='admin'
             AND "CU"."UserId"='${context.params.User.id}' THEN true
           ELSE false
           END
           ) AS "canInUploadDoc",

          (CASE 
            WHEN "CR"."name"='admin' 
             AND "CR"."id" = "CU"."CommunityRoleId" 
             AND "CU"."UserId"='${context.params.User.id}' THEN true
            WHEN "C"."canInUploadPhotos" = 'E' THEN true 
            WHEN "C"."canInUploadPhotos" = 'M'  
             AND "CR"."id" = "CU"."CommunityRoleId" 
             AND ("CR"."name"='admin' OR "CR"."name"='moderator')
             AND "CU"."UserId"='${context.params.User.id}' THEN true
           WHEN "C"."canInUploadPhotos" = 'A'  
             AND "CR"."id" = "CU"."CommunityRoleId" 
             AND "CR"."name"='admin'
             AND "CU"."UserId"='${context.params.User.id}' THEN true
           ELSE false
           END
           ) AS "canInUploadPhotos",

          (CASE 
            WHEN "CR"."name"='admin' 
             AND "CR"."id" = "CU"."CommunityRoleId" 
             AND "CU"."UserId"='${context.params.User.id}' THEN true
            WHEN "C"."canInUploadVideo" = 'E' THEN true 
            WHEN "C"."canInUploadVideo" = 'M'  
             AND "CR"."id" = "CU"."CommunityRoleId" 
             AND ("CR"."name"='admin' OR "CR"."name"='moderator')
             AND "CU"."UserId"='${context.params.User.id}' THEN true
           WHEN "C"."canInUploadVideo" = 'A'  
             AND "CR"."id" = "CU"."CommunityRoleId" 
             AND "CR"."name"='admin'
             AND "CU"."UserId"='${context.params.User.id}' THEN true
           ELSE false
           END
           ) AS "canInUploadVideo",
          (CASE 
            WHEN "CR"."name"='admin' 
             AND "CR"."id" = "CU"."CommunityRoleId" 
             AND "CU"."UserId"='${context.params.User.id}' THEN true
            WHEN "C"."canMessageInGroup" = 'E' THEN true 
            WHEN "C"."canMessageInGroup" = 'M'  
             AND "CR"."id" = "CU"."CommunityRoleId" 
             AND ("CR"."name"='admin' OR "CR"."name"='moderator')
             AND "CU"."UserId"='${context.params.User.id}' THEN true
           WHEN "C"."canMessageInGroup" = 'A'  
             AND "CR"."id" = "CU"."CommunityRoleId" 
             AND "CR"."name"='admin'
             AND "CU"."UserId"='${context.params.User.id}' THEN true
           ELSE false
           END
           ) AS "canMessageInGroup",

          COUNT(DISTINCT CASE WHEN "CU"."CommunityId"='${context.id}' THEN "CU"."UserId" END) As "amountOfMembers",  
          json_agg( 
            json_build_object(
              'id', "I"."id",
              'name',"I"."name"
          )) as "Interests"
          FROM "Communities" AS "C" 
          INNER JOIN "CommunityUsers" AS "CU" ON "CU"."CommunityId" = '${context.id}'
          INNER JOIN "CommunityRoles" AS "CR" ON "CR"."id" = "CU"."CommunityRoleId"
          INNER JOIN "Community_Interest" AS "CI" ON "CI"."CommunityId" = '${context.id}'
          INNER JOIN "Interests" AS "I" ON "I"."id" = "CI"."InterestId"
          WHERE "C"."id" = '${context.id}' AND ("C"."privacyType" = 'public' OR ("CU"."UserId" = '${context.params.User.id}' AND "CU"."untilDate" IS NULL))
          
           GROUP BY "C"."name","C"."description", "C"."id" ,"C"."privacyType" , "C"."profilePicture", "C"."coverPicture","CU"."CommunityId", "CU"."UserId","CU"."CommunityRoleId","CU"."banned","CU"."bannedDate","CR"."name","CR"."id"
           LIMIT 1`;
  const community = await Sequelize.query(query, {
    name: 'Query',
    type: QueryTypes.SELECT,
  });
  if (!community[0])
    throw new BadRequest(
      `Community with id ${context.id} not found or you have no access right to it`
    );
  // eslint-disable-next-line prefer-destructuring
  context.result = community[0];
  return context;
};
