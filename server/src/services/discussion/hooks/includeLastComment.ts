// import IncludeAssociations from '../../../Hooks/IncludeAssociations';
import { QueryTypes } from '@sequelize/core';
import { BadRequest } from '@feathersjs/errors';
import getPaginationDetails from '../../../lib/utils/getPaginationDetails';
import getQueryParameters from '../../../lib/utils/getQueryParameters';
import getPaginatedResponse from '../../../lib/utils/getPaginatedResponse';

const IncludeLast = (single: boolean) => async (context) => {
  const { app, params, service } = context;
  const { query = {} } = params;
  const stringQuery = getQueryParameters('D', 'DiscussionId', query);
  let { $limit, $skip } = query;
  let { max } = service.options.paginate;
  const Sequelize = app.get('sequelizeClient');
  const INTERNAL_MAX = 50;
  max = Number.parseInt(max, 10) || INTERNAL_MAX;
  $limit = Number.parseInt($limit, 10) || max;
  $skip = Number.parseInt($skip, 10) || 0;

  const { offsetAndLimit } = getPaginationDetails({ $limit, $skip, max });
  const command = `SELECT 
  "D"."id", 
  "D"."title",
  "D"."body",
  "D"."banned",
  "D"."bannedReason",
  "D"."locked",
  json_build_object(
      'id',"U"."id",
      'firstName',"U"."firstName",
      'lastName',"U"."lastName",
      'profilePicture',"U"."profilePicture",
      'createdAt',"U"."createdAt",
      'updatedAt',"U"."updatedAt"
    ) AS "User", 
    ( 
      SELECT 
      COUNT(DISTINCT "DCM"."UserId")
      FROM "Discussions" AS "DCM"
      WHERE "DCM"."DiscussionId" = "D"."id"
      )::int As "activeParticipants" ,
    (
      SELECT 
      COUNT(*) 
      FROM "Discussions" AS "DCC"
      WHERE "DCC"."DiscussionId" = "D"."id"
    )::int As "amountOfComments" , 
    (
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
      
      WHERE "DC"."DiscussionId"="D"."id"
      ORDER BY "DC"."createdAt" ASC
      LIMIT 1
    ) AS "lastComment"
    From "Discussions" AS "D" 
    INNER JOIN "Users" AS "U" ON "D"."UserId" = "U"."id"
    ${single ? `WHERE "D"."id"='${context.id}'` : stringQuery}
    GROUP BY "D"."id","D"."title", "D"."body","U"."firstName" ,"U"."id", "U"."lastName","U"."profilePicture","U"."createdAt","U"."updatedAt"
    LIMIT ${single ? 1 : offsetAndLimit.limit} 
    OFFSET ${single ? 0 : offsetAndLimit.offset}
     `;

  try {
    const discussionList = await Sequelize.query(command, {
      type: QueryTypes.SELECT,
    });

    context.result = single
      ? discussionList[0]
      : getPaginatedResponse({ $limit, $skip, data: discussionList, max });
  } catch (error) {
    if (error?.original?.code)
      switch (error?.original?.code) {
        case '42703':
          throw new BadRequest('You requested a column that does not exists');
        default:
          throw new Error(error.message);
      }
    throw new Error(error.message);
  }

  return context;
};
export default IncludeLast;
