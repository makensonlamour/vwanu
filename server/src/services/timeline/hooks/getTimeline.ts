// import isEmpty from 'lodash/isEmpty';
import { Op } from '@sequelize/core';

const UserAttributes = [
  'firstName',
  'lastName',
  'id',
  'profilePicture',
  'createdAt',
];
export default (context) => {
  const { app, params } = context;
  const Sequelize = app.get('sequelizeClient');

  const amountOfComments = `(
      SELECT 
      COUNT(*) 
      FROM "Posts" AS "Pt"
      WHERE "Pt"."PostId" = "Post"."id"
    )::int`;
  const amountOfReactions = `(
      SELECT 
      COUNT("R"."id") 
      FROM "Reactions" AS "R"
      WHERE "R"."entityId" = "Post"."id" AND "R"."entityType"='Post'
    )::int`;
  const isReactor = `(
SELECT 
  json_agg(
    json_build_object(
     'id', "R"."id",
     'content',"R"."content",
     'createdAt',"R"."createdAt",
     'updatedAt',"R"."updatedAt"
    ) 
    ) 
    FROM "Reactions" AS "R"
    WHERE "R"."entityId"="Post"."id" AND  "R"."entityType"='Post' AND "R"."UserId"='${context.params.User.id}'
  )`;
  const friends = `(
     EXISTS(
      SELECT 1 FROM "User_friends" WHERE "User_friends"."UserId" = "Post"."UserId" AND "User_friends"."friendId" = '${params.User.id}'
     )
    )`;

  const WallUser = `(
  SELECT 
  json_build_object(
   'firstName', "U"."firstName",
   'lastName', "U"."lastName",
   'id', "U"."id",
   'profilePicture', "U"."profilePicture",
   'createdAt' ,"U"."createdAt"
   )
  FROM "Users" AS "U"
  WHERE  "Post"."wallId" IS NOT NULL AND "U"."id" = "Post"."wallId"
  )`;

  const Original = `(
  SELECT
  CASE 
  WHEN "Post"."originalId" IS NULL THEN NULL
  WHEN "Post"."originalType" = 'Post' THEN
  (
  SELECT 
  json_build_object(
    'id', "P"."id",
    'content', "P"."postText",
    'createdAt', "P"."createdAt",
    'updatedAt', "P"."updatedAt",
    'firstName', "U"."firstName",
    'lastName', "U"."lastName",
    'UserId', "U"."id",
    'profilePicture', "U"."profilePicture"
  )
    FROM "Posts" AS "P" 
    INNER JOIN "Users" AS "U" ON "U"."id" = "P"."UserId"
    WHERE "P"."id" = "Post"."originalId"
    LIMIT 1
    )
  WHEN "Post"."originalType" = 'Blogs' THEN
  (
  SELECT 
  json_build_object(
    'id', "B"."id",
    'content', "B"."blogText",
    'createdAt', "B"."createdAt",
    'updatedAt', "B"."updatedAt",
    'coverPicture', "B"."coverPicture",
    'firstName', "U"."firstName",
    'lastName', "U"."lastName",
    'UserId', "U"."id",
    'profilePicture', "U"."profilePicture"
  )
    FROM "Blogs" AS "B"
    INNER JOIN "Users" AS "U" ON "U"."id" = "B"."UserId"
    WHERE "B"."id" = "Post"."originalId"
    LIMIT 1
  )
  WHEN "Post"."originalType" = 'Discussion' THEN
  (
  SELECT
  json_build_object(
    'id', "D"."id",
    'content', "D"."body",
    'createdAt', "D"."createdAt",
    'updatedAt', "D"."updatedAt",
    'firstName', "U"."firstName",
    'lastName', "U"."lastName",
    'UserId', "U"."id",
    'profilePicture', "U"."profilePicture"
  )
    FROM "Discussions" AS "D"
    INNER JOIN "Users" AS "U" ON "U"."id" = "D"."UserId"
    WHERE "D"."id" = "Post"."originalId"
    LIMIT 1
  )
  END
)`;
  const { query: where } = context.app
    .service(context.path)
    .filterQuery(context.params);

  const single = context.method === 'get';
  const queryString = /* isEmpty(where)
    ? */ {
    PostId: null,
    ...where,
    [Op.and]: {
      [Op.or]: [
        { privacyType: 'public' },
        { UserId: params.User.id },
        {
          [Op.and]: [{ privacyType: 'friends' }, Sequelize.literal(friends)],
        },
      ],
    },
  };
  /*: { ...where }; */

  const clause = single ? { id: context.id } : queryString;

  params.sequelize = {
    // logging: console.log,
    where: clause,
    attributes: {
      include: [
        [Sequelize.literal(amountOfComments), 'amountOfComments'],
        [Sequelize.literal(amountOfReactions), 'amountOfReactions'],
        [Sequelize.literal(isReactor), 'isReactor'],
        [Sequelize.literal(WallUser), 'WallUser'],
        [Sequelize.literal(Original), 'Original'],
      ],
      exclude: ['UserId'],
    },

    include: [
      {
        model: Sequelize.models.User,
        attributes: UserAttributes,
        required: true,
      },
      {
        model: Sequelize.models.Community,
      },
      {
        model: Sequelize.models.Media,
        include: {
          model: Sequelize.models.User,
          attributes: UserAttributes,
        },
      },
    ],
    raw: false,
  };

  return context;
};
