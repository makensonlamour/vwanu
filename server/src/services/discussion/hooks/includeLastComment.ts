// import IncludeAssociations from '../../../Hooks/IncludeAssociations';
import { QueryTypes } from '@sequelize/core';
import isEmpty from 'lodash/isEmpty';
import { BadRequest } from '@feathersjs/errors';

const IncludeLast = (single: boolean) => async (context) => {
  const { app, params } = context;
  const { query = {} } = params;
  let stringQuery = 'WHERE "D"."DiscussionId" IS NULL';
  if (!isEmpty(params.query)) {
    stringQuery = 'WHERE'.concat(
      Object.keys(query)
        .map((key) => `"D"."${key}"='${query[key]}'`)
        .join('"AND"')
    );
  }
  const Sequelize = app.get('sequelizeClient');

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
    LIMIT 50
     `;

  try {
    const discussionList = await Sequelize.query(command, {
      type: QueryTypes.SELECT,
    });

    context.result = single ? discussionList[0] : discussionList;
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
  // return IncludeAssociations({
  //   include: [
  //     {
  //       model: 'discussion',
  //       as: 'User',
  //       // attributes: [
  //       //   'id',
  //       //   'firstName',
  //       //   'lastName',
  //       //   'profilePicture',
  //       //   'createdAt',

  //       // ],
  //       attributes: {
  //         include: [
  //           [
  //             Sequelize.fn('COUNT', Sequelize.col('discussion.id')),
  //             'sensorCount',
  //           ],
  //         ],
  //       },
  //     },
  //     // {
  //     //   model: 'conversation',
  //     //   as: 'Messages',
  //     //   order: [['createdAt', 'desc']],

  //     //   limit: 1,
  //     //   include: [
  //     //     {
  //     //       model: 'message',
  //     //       as: 'sender',
  //     //       attributes: ['id', 'firstName', 'lastName', 'profilePicture'],
  //     //     },
  //     //   ],
  //     // },
  //   ],
  // })(context);
};
export default IncludeLast;
