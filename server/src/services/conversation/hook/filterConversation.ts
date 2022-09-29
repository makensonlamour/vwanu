/* eslint-disable no-underscore-dangle */
import { HookContext } from '@feathersjs/feathers';
import isNill from 'lodash/isNil';
import { Op } from '@sequelize/core';

export default async (context: HookContext) => {
  const { params, app, method } = context;
  const Sequelize = app.get('sequelizeClient');
  const { User } = params;
  if (isNill(User))
    throw new Error('Only authenticated users can access this service.');

  const isParticipant = `(
    EXISTS (
    SELECT 1 FROM "Conversation_Users" AS "CU" 
    WHERE "CU"."UserId"='${context.params.User.id}' AND "CU"."ConversationId"= "Conversation"."id"
    )
  )`;

  const amountOfMessage = `(
    SELECT 
    COUNT(DISTINCT "M"."id")
    FROM "Messages" AS "M"
    WHERE "M"."ConversationId"="Conversation"."id")::int`;

  const amountOfUnreadMessages = `(
    SELECT 
    COUNT(DISTINCT "M"."id")
    FROM "Messages" AS "M"
    WHERE "M"."ConversationId"="Conversation"."id" AND "M"."read"=false AND "M"."senderId" != '${context.params.User.id}'
    )::int`;

  const amountOfPeople = `(
    SELECT 
    COUNT(DISTINCT "CU"."UserId")
    FROM "Conversation_Users" AS "CU"
    WHERE "CU"."ConversationId"="Conversation"."id")::int`;

  const Users = `(
    SELECT 
    json_agg(
    json_build_object(
      'id', "U"."id",
      'firstName',"U"."firstName",
      'lastName',"U"."lastName",
      'createdAt',"U"."createdAt",
      'updatedAt',"U"."updatedAt",
      'profilePicture',"U"."profilePicture"
    )
      )
     FROM "Conversation_Users" AS "CU" 
     INNER JOIN "Users" AS "U" ON "U"."id" = "CU"."UserId"
     WHERE "CU"."ConversationId"="Conversation"."id"
  )`;

  const lastMessage = `(
    SELECT
    json_build_object(
      'id', "M"."id",
      'messageText',"M"."messageText",
      'createdAt',"M"."createdAt",
      'read',"M"."read",
      'received',"M"."received",
      'readDate',"M"."readDate",
      'receivedDate',"M"."receivedDate",
      'ConversationId',"M"."ConversationId",
      'updatedAt',"M"."updatedAt",
      'senderId',"M"."senderId",
      'senderFirstName',"U"."firstName",
      'senderLastName',"U"."lastName",
      'senderProfilePicture',"U"."profilePicture"
    )
    FROM "Messages" AS "M"
    INNER JOIN "Users" AS "U" ON "U"."id" = "M"."senderId"
    WHERE "M"."ConversationId"="Conversation"."id"
    ORDER BY "M"."createdAt" DESC
    LIMIT 1
  )`;

  // const lastMassage = `(
  //   SELECT
  //   json_agg(
  //   json_build_object(
  //     'id', "CU"."id",
  //     'firstName',"U"."firstName",
  //     'lastName',"U"."lastName",
  //     'createdAt',"U"."createdAt",
  //     'updatedAt',"U"."updatedAt",
  //     'profilePicture',"U"."profilePicture"
  //   )
  //     )
  //    FROM "Conversation_Users" AS "CU"
  //    INNER JOIN "Users" AS "U" ON "U"."id" = "CU"."UserId"
  //    WHERE "CU"."ConversationId"="Conversations"."id"
  //    L
  // )`;

  const { query: where } = context.app
    .service(context.path)
    .filterQuery(context.params);

  if (method === 'get') where.id = context.id;
  const clause = {
    ...where,
    [Op.and]: [Sequelize.where(Sequelize.literal(isParticipant), true)],
  };
  params.sequelize = {
    // logging: console.log,
    where: clause,
    attributes: {
      include: [
        [Sequelize.literal(amountOfMessage), 'amountOfMessage'],
        [Sequelize.literal(Users), 'Users'],
        [Sequelize.literal(lastMessage), 'lastMessage'],
        [Sequelize.literal(amountOfPeople), 'amountOfPeople'],
        [Sequelize.literal(amountOfUnreadMessages), 'amountOfUnreadMessages'],
      ],
      exclude: ['amountOfMessages', 'amountOfUnreadMessages', 'amountOfPeople'],
    },

    // include: [
    //   {
    //     model: Sequelize.models.Conversation_Users,
    //     attribute: [],
    //     // required: true,
    //   },
    // ],
    raw: false,
  };
  // try {
  //   const result = await app.service('conversation-users')._find({
  //     query: { UserId: User.id },
  //     User,
  //     // paginate: false,
  //   });

  //   context.result = result;
  // } catch (err) {
  //   throw new GeneralError(
  //     `We could not find your conversation due to ${err.message}`
  //   );
  // }

  return context;
};
