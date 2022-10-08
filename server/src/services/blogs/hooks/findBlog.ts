import { Op } from '@sequelize/core';
import { HookContext } from '@feathersjs/feathers';

export default async (context: HookContext): Promise<HookContext> => {
  const { app, params } = context;
  const Sequelize = app.get('sequelizeClient');
  const { filters, query: where } = context.app
    .service(context.path)
    .filterQuery(context.params);

  let order = [];

  const specialOrders = [
    'amountOfMembers',
    'amountOfComments',
    'amountReaction',
  ];

  const customFilters: any = {};
  if (filters.$sort) {
    specialOrders.forEach((specialOrder) => {
      customFilters[specialOrder] = filters.$sort[specialOrder];
      delete filters.$sort[specialOrder];
    });

    const allField = { ...filters.$sort, ...customFilters };
    order = Object.keys(allField).map((key) => {
      const descAsc = allField[key] === 1 ? 'ASC' : 'DESC';
      if (customFilters[key])
        return [[Sequelize.literal(`"${key}"`), `${descAsc}`]];
      return [`${key}`, descAsc];
    });
  }

  const OnlyInterests = (interest) =>
    `(
  EXISTS(
    SELECT 1 FROM "Interests" AS "I" 
    INNER JOIN "Blog_Interest" AS "BI" ON "BI"."InterestId"="I"."id" AND "BI"."BlogId"="Blog"."id"
    WHERE "I"."name"= '${interest}' )
  
  )`;

  let interests;
  if (where.interests) {
    interests = where.interests;
    delete where.interests;
  }

  const isAReactor = `(
  EXISTS(
    SELECT 1
    FROM "Reactions" AS "R"
    WHERE "R"."entityId"="Blog"."id" AND  "R"."entityType"='Blog' AND "R"."UserId"='${context.params.User.id}'
    )
  )`;
  const isAResponder = `(
  EXISTS(
   SELECT 1
   FROM "BlogResponses" AS "R"
   WHERE "R"."BlogId"="Blog"."id" AND "R"."UserId"='${context.params.User.id}'
    ))`;

  const Interests = `(
SELECT 
  json_agg(
    json_build_object(
      'name',"I"."name",
      'id',"I"."id"
  )) FROM "Interests" AS "I" 
  INNER JOIN "Blog_Interest" AS "BI" ON "BI"."InterestId" = "I"."id"
  WHERE "BI"."BlogId"="Blog"."id"
)`;

  const amountOfReactions = `(
      SELECT 
      COUNT("R"."id") 
      FROM "Reactions" AS "R"
      WHERE "R"."entityId" = "Blog"."id" AND "R"."entityType"='Blog'
    )::int`;
  const amountOfComments = `(
     SELECT 
      COUNT("BlogResponses"."id")
      FROM "BlogResponses" 
      WHERE "BlogResponses"."BlogId" = "Blog"."id"
  )::int`;
  const lastResponse = `(
    SELECT
    json_build_object(
      'id', "R"."id",
      'responseText',"R"."responseText",
      'createdAt',"R"."createdAt",
      'updatedAt',"R"."updatedAt",
      'responderId',"R"."UserId",
      'responderFirstName',"U"."firstName",
      'responderLastName',"U"."lastName",
      'responderProfilePicture',"U"."profilePicture"
    )
    FROM "BlogResponses" AS "R"
    INNER JOIN "Users" AS "U" ON "U"."id" = "R"."UserId"
    WHERE "R"."BlogId"="Blog"."id"
    ORDER BY "R"."createdAt" DESC
    LIMIT 1
  )`;

  const clause = {
    ...where,
    [Op.and]: [{ [Op.or]: [{ publish: true }, { UserId: params.User.id }] }],
  };

  if (interests) {
    clause[Op.and].push(
      Sequelize.where(Sequelize.literal(OnlyInterests(interests)), true)
    );
  }

  if (context.method === 'get') where.id = context.id;
  params.sequelize = {
    where: clause,

    attributes: {
      include: [
        [Sequelize.literal(isAReactor), 'isAReactor'],
        [Sequelize.literal(isAResponder), 'isAResponder'],
        [Sequelize.literal(Interests), 'Interests'],
        [Sequelize.literal(amountOfReactions), 'amountOfReactions'],
        [Sequelize.literal(amountOfComments), 'amountOfComments'],
        [Sequelize.literal(lastResponse), 'lastResponse'],
      ],
    },
    include: [
      {
        model: Sequelize.models.User,
        attributes: [
          'id',
          'firstName',
          'lastName',
          'profilePicture',
          'createdAt',
          'updatedAt',
        ],
        required: true,
      },
    ],
    order,
    raw: false,
  };

  return context;
};
