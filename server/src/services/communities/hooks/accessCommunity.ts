import { QueryTypes } from '@sequelize/core';
import { BadRequest } from '@feathersjs/errors';
import { HookContext, Id } from '@feathersjs/feathers';

const hasAccess = (
  userId: Id,
  field:
    | 'canInvite'
    | 'canInPost'
    | 'canInUploadDoc'
    | 'canInUploadPhotos'
    | 'canInUploadVideo'
    | 'canMessageInGroup'
): string =>
  `(CASE 
            WHEN "CR"."name"='admin' 
             AND "CR"."id" = "CU"."CommunityRoleId" 
             AND "CU"."UserId"='${userId}' THEN true
            WHEN "C"."${field}" = 'E' 
            AND "CU"."UserId"='${userId}' THEN true
            WHEN "C"."${field}" = 'M'  
             AND "CR"."id" = "CU"."CommunityRoleId" 
             AND ("CR"."name"='admin' OR "CR"."name"='moderator')
             AND "CU"."UserId"='${userId}' THEN true
           WHEN "C"."${field}" = 'A'  
             AND "CR"."id" = "CU"."CommunityRoleId" 
             AND "CR"."name"='admin'
             AND "CU"."UserId"='${userId}' THEN true
           ELSE false
           END
           )`;

export default async (context: HookContext) => {
  const { app } = context;
  const Sequelize = app.get('sequelizeClient');
  const query = `
          Select "C"."id", "C"."name", "C"."description", "C"."privacyType" , "C"."UserId", "C"."profilePicture", "C"."coverPicture", "C"."haveDiscussionForum","C"."canInvite", "C"."canInPost","C"."canInUploadPhotos","C"."canInUploadDoc","C"."canInUploadVideo","C"."canMessageInGroup", "C"."haveDiscussionForum", "C"."amountOfMembers",CU"."banned","CU"."bannedDate", 
          (SELECT 
            json_build_object(
             'id', "CU"."UserId",
             'role',"CR"."name",
             'roleId',"CR"."id"
              ) from "CommunityUsers" as "CU" 
            INNER JOIN "CommunityRoles" AS "CR" ON "CR"."id" = "CU"."CommunityRoleId"
            WHERE "CU"."CommunityId"="C"."id" and "CU"."UserId"='${
              context.params.User.id
            }' AND "CU"."untilDate" IS NULL
              ) AS "IsMember",
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
                    'guestId',"INV"."guestId")
                    ) FROM "CommunityInvitationRequests" AS "INV" 
                    INNER JOIN "CommunityRoles" AS "R" ON "R"."id" = "INV"."CommunityRoleId"
                    WHERE "INV"."CommunityId"="C"."id" AND "INV"."guestId"='${
                      context.params.User.id
                    }' AND "INV"."response" IS NULL
                    )AS "pendingInvitation",
          ${hasAccess(context.params.User.id, 'canInPost')}AS "canUserPost",
          ${hasAccess(context.params.User.id, 'canInvite')}AS "canUserInvite",
          ${hasAccess(
            context.params.User.id,
            'canInUploadDoc'
          )}AS "canUserUploadDoc",

           ${hasAccess(
             context.params.User.id,
             'canInUploadPhotos'
           )}AS "canUserUploadPhotos",

        ${hasAccess(
          context.params.User.id,
          'canInUploadVideo'
        )} AS "canUserUploadVideo",
${hasAccess(
  context.params.User.id,
  'canMessageInGroup'
)} AS "canMessageUserInGroup",
  
         
          json_agg( 
            json_build_object(
              'id', "I"."id",
              'name',"I"."name"
          )) as "Interests"
          FROM "Communities" AS "C" 
          INNER JOIN "CommunityUsers" AS "CU" ON "CU"."CommunityId" = '${
            context.id
          }'
          INNER JOIN "CommunityRoles" AS "CR" ON "CR"."id" = "CU"."CommunityRoleId"
          INNER JOIN "Community_Interest" AS "CI" ON "CI"."CommunityId" = '${
            context.id
          }'
          INNER JOIN "Interests" AS "I" ON "I"."id" = "CI"."InterestId"
          WHERE "C"."id" = '${
            context.id
          }' AND ("C"."privacyType" = 'public' OR ("CU"."UserId" = '${
    context.params.User.id
  }' AND "CU"."untilDate" IS NULL AND "CU"."banned"=false))
          
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
