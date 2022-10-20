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
