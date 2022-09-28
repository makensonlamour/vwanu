import { Op } from '@sequelize/core';
import { HookContext } from '@feathersjs/feathers';

export default async (context: HookContext) => {
  const { app, params } = context;
  const Sequelize = app.get('sequelizeClient');

  const { filters, query: where } = context.app
    .service(context.path)
    .filterQuery(context.params);

  let order = [];
  if (filters.$sort) {
    const { amountOfMembers } = filters.$sort;
    const customFilters: any = {};
    if (amountOfMembers) {
      customFilters.amountOfMembers = amountOfMembers;
      delete filters.$sort.amountOfMembers;
    }
    const allField = { ...filters.$sort, ...customFilters };
    order = Object.keys(allField).map((key) => {
      const descAsc = allField[key] === 1 ? 'ASC' : 'DESC';
      if (customFilters[key])
        return [[Sequelize.literal(`"${key}"`), `${descAsc}`]];
      return [`${key}`, descAsc];
    });
  }

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

  const countAmountOfMembers = `(
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
    // loging: console.log,
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
        [Sequelize.literal(countAmountOfMembers), 'amountOfMembers'],
        [Sequelize.literal(pendingInvitation), 'pendingInvitation'],
      ],
    },
    include: { model: Sequelize.models.CommunityUsers, required: true },
    order,
    raw: false,
  };

  return context;
};
