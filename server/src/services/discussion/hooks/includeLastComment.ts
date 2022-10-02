// import IncludeAssociations from '../../../Hooks/IncludeAssociations';
import { Op } from '@sequelize/core';
import isEmpty from 'lodash/isEmpty';

const IncludeLast = (single: boolean) => async (context) => {
  const { app, params } = context;

  const Sequelize = app.get('sequelizeClient');

  const activeParticipants = ` ( 
      SELECT 
      COUNT(DISTINCT "DCM"."UserId")
      FROM "Discussions" AS "DCM"
      WHERE "DCM"."DiscussionId" = "Discussion"."id"
      )::int
    `;

  const amountOfComments = `(   SELECT 
      COUNT(*) 
      FROM "Discussions" AS "DCC"
      WHERE "DCC"."DiscussionId" = "Discussion"."id"
    )::int`;

  const amountOfReactions = `(
      SELECT 
      COUNT("R"."id") 
      FROM "Reactions" AS "R"
      WHERE "R"."entityId" = "Discussion"."id" AND "R"."entityType"='Discussion'
    )::int`;
  const lastComment = `(
    SELECT   
      json_build_object(
        'id',"DC"."id",
        'title',"DC"."title", 
        'body',"DC"."body", 
        'createdAt',"DC"."createdAt",
        'updatedAt',"DC"."updatedAt",
        'UserId',"DC"."UserId",
        'commenterFirstName',"UC"."firstName",
        'commenterLastName',"UC"."lastName",
        'commenterProfilePicture',"UC"."profilePicture"
       )
      From "Discussions" AS "DC" 
      INNER JOIN "Users" AS "UC" ON "DC"."UserId" = "UC"."id"
      
      WHERE "DC"."DiscussionId"="Discussion"."id"
      ORDER BY "DC"."createdAt" ASC
      LIMIT 1
    ) `;

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
    WHERE "R"."entityId"="Discussion"."id" AND  "R"."entityType"='Discussion' AND "R"."UserId"='${context.params.User.id}'
  )`;

  const OnCategory = (categoryId) =>
    `(
    EXISTS(
     SELECT 1 
     FROM "DiscussionInterest" AS "Di" 
     WHERE "Di"."DiscussionId"= "Discussion"."id" AND "Di"."InterestId" IN 
     (SELECT "InterestId" AS "id" FROM "CategoryInterest" WHERE "CategoryInterest"."id='${categoryId}')
    ))`;

  const { query: where } = context.app
    .service(context.path)
    .filterQuery(context.params);

  // eslint-disable-next-line no-nested-ternary
  const clause = single
    ? { id: context.id }
    : isEmpty(where)
    ? { DiscussionId: null }
    : { ...where, [Op.and]: [] };

  if (where.categoryId) {
    const { categoryId } = where;

    clause[Op.and].push(
      Sequelize.where(Sequelize.literal(OnCategory(categoryId)), true)
    );
  }
  params.sequelize = {
    where: clause,
    attributes: {
      include: [
        [Sequelize.literal(activeParticipants), 'activeParticipants'],
        [Sequelize.literal(amountOfComments), 'amountOfComments'],
        [Sequelize.literal(lastComment), 'lastComment'],
        [Sequelize.literal(amountOfReactions), 'amountOfReactions'],
        [Sequelize.literal(isReactor), 'isReactor'],
      ],
      exclude: ['DiscussionId', 'UserId', 'CommunityId'],
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
    raw: false,
  };

  return context;
};
export default IncludeLast;
