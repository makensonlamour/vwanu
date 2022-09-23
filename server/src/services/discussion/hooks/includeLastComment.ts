// import IncludeAssociations from '../../../Hooks/IncludeAssociations';

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

  const { query: where } = context.app
    .service(context.path)
    .filterQuery(context.params);

  // eslint-disable-next-line no-nested-ternary
  const clause = single
    ? { id: context.id }
    : isEmpty(where)
    ? { DiscussionId: null }
    : { ...where };
  params.sequelize = {
    where: clause,
    attributes: {
      include: [
        [Sequelize.literal(activeParticipants), 'activeParticipants'],
        [Sequelize.literal(amountOfComments), 'amountOfComments'],
        [Sequelize.literal(lastComment), 'lastComment'],
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
