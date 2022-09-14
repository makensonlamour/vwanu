import { QueryTypes } from '@sequelize/core';
import { HookContext } from '@feathersjs/feathers';

export default async (context: HookContext) => {
  const { data } = context;
  if (data?.type !== 'direct') return context;
  const { userIds } = data;
  const Sequelize = context.app.get('sequelizeClient');

  const {
    params: { User },
  } = context;

  try {
    const existingConversation = await Sequelize.query(
      `SELECT "ConversationId" FROM "Conversation_Users" WHERE "UserId" IN (${[
        ...userIds,
        User.id,
      ].map((id) => `'${id}'`)}) 
      GROUP BY "ConversationId"
      HAVING COUNT("ConversationId") > 1`,
      { type: QueryTypes.SELECT }
    );

    if (existingConversation.length > 0) {
      // eslint-disable-next-line prefer-destructuring
      context.result = existingConversation[0];
      context.data.userIds = null;
    }
  } catch (err) {
    console.log('Here is where the error occured');
    throw new Error(err.message);
  }
  return context;
};
