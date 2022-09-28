import { Op } from '@sequelize/core';
import { HookContext } from '@feathersjs/feathers';

export default async (context: HookContext) => {
  const { app, params } = context;
  const Sequelize = app.get('sequelizeClient');

  //   const query2 = `SELECT
  //   "C"."name",
  //   "C"."description",
  //   "C"."privacyType",
  //   "C"."id",
  //   "C"."UserId",
  //   "C"."profilePicture",
  //   "C"."coverPicture",
  //   COUNT(DISTINCT CASE WHEN "CU"."CommunityId"="C"."id" THEN "CU"."UserId" END)::int As "amountOfMembers" ,
  //   (SELECT
  //     json_build_object(
  //      'id', "CU"."UserId",
  //      'role',"CR"."name",
  //      'roleId',"CR"."id"
  //     )
  //     FROM "CommunityUsers" AS "CU"
  //     INNER JOIN "CommunityRoles" AS "CR" ON "CR"."id" = "CU"."CommunityRoleId"
  //     WHERE "CU"."CommunityId"="C"."id" and "CU"."UserId"='${context.params.User.id}'
  //   ) as "IsMember",

  // (SELECT
  //   json_agg(
  //     json_build_object('id', "U"."id",
  //       'firstName',"U"."firstName",
  //       'lastName',"U"."lastName",
  //       'profilePicture',"U"."profilePicture",
  //       'createdAt',"U"."createdAt",
  //       'updatedAt',"U"."updatedAt",
  //       'role',"CR"."name",
  //       'roleId',"CR"."id"
  //     )
  //   )
  //   FROM "CommunityUsers" AS "CU"
  //   INNER JOIN "CommunityRoles" AS "CR" ON "CR"."id" = "CU"."CommunityRoleId"
  //   INNER JOIN "Users" AS "U" ON "CU"."UserId" = "U"."id"
  //   WHERE "CU"."UserId"="U"."id" AND "CU"."CommunityId"="C"."id"
  //   LIMIT 10
  //   )as "members",

  // (SELECT
  //   json_agg(
  //     json_build_object(
  //       'name',"I"."name",
  //       'id',"I"."id"
  //   )) FROM "Interests" AS "I"
  //   INNER JOIN "Community_Interest" AS "CI" ON "CI"."InterestId" = "I"."id"
  //   WHERE "CI"."CommunityId"="C"."id"
  // )as "Interests"

  // FROM "Communities" AS "C"
  // INNER JOIN "CommunityUsers" as "CU" ON "CU"."CommunityId"="C"."id"
  //  WHERE  "C"."privacyType" <> 'hidden' OR ("CU"."UserId"='${context.params.User.id}' AND "C"."privacyType" = 'hidden')
  // GROUP BY "C"."name","C"."description", "C"."id"
  // LIMIT 20
  //   `;
  const { query: where } = context.app
    .service(context.path)
    .filterQuery(context.params);

  const isMember = `(
  SELECT 
    json_build_object(
     'id', "CU"."UserId",
     'role',"CR"."name",
     'roleId',"CR"."id"
    ) 
    FROM "CommunityUsers" AS "CU"
    INNER JOIN "CommunityRoles" AS "CR" ON "CR"."id" = "CU"."CommunityRoleId"
    WHERE "CU"."CommunityId"="Community"."id" and "CU"."UserId"='${context.params.User.id}'
  )`;

  const Interests = `(
SELECT 
  json_agg(
    json_build_object(
      'name',"I"."name",
      'id',"I"."id"
  )) FROM "Interests" AS "I" 
  INNER JOIN "Community_Interest" AS "CI" ON "CI"."InterestId" = "I"."id"
  WHERE "CI"."CommunityId"="Community"."id"
)`;

  const members = `(SELECT 
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
  WHERE "CU"."UserId"="U"."id" AND "CU"."CommunityId"="Community"."id"
  LIMIT 10
  )`;

  const amountOfMembers = `(
    SELECT 
    COUNT(DISTINCT "CU"."UserId")
    FROM "CommunityUsers" AS "CU"
    WHERE "CU"."CommunityId"="Community"."id")::int`;
  // WHERE  "C"."privacyType" <> 'hidden' OR ("CU"."UserId"='${context.params.User.id}' AND "C"."privacyType" = 'hidden')

  const isParticipant = `(
    EXISTS (SELECT 1 FROM "CommunityUsers" AS "CU" WHERE "CU"."CommunityId"="Community"."id" AND "CU"."UserId"='${context.params.User.id}')
  )`;
  const pendingInvitation = `(
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
      )
     FROM "CommunityInvitationRequests" AS "INV" 
     INNER JOIN "CommunityRoles" AS "R" ON "R"."id" = "INV"."CommunityRoleId"
     WHERE "INV"."CommunityId"="Community"."id" AND "INV"."guestId"='${context.params.User.id}' AND "INV"."response" IS NULL
  )`;
  const clause = {
    ...where,
    [Op.and]: {
      [Op.or]: [
        { privacyType: { [Op.ne]: 'hidden' } },
        {
          [Op.and]: [
            { privacyType: 'hidden' },
            Sequelize.where(Sequelize.literal(isParticipant), true),
          ],
        },
      ],
    },
  };
  params.sequelize = {
    where: clause,
    // logging: console.log,
    attributes: {
      include: [
        [Sequelize.literal(isMember), 'IsMember'],
        [Sequelize.literal(Interests), 'Interests'],
        [Sequelize.literal(members), 'members'],
        [Sequelize.literal(amountOfMembers), 'amountOfMembers'],
        [Sequelize.literal(pendingInvitation), 'pendingInvitation'],
      ],
    },

    raw: false,
  };

  // const communities = await Sequelize.query(query2, {
  //   type: QueryTypes.SELECT,
  // });

  // context.result = communities;

  return context;
};
