import { Op } from '@sequelize/core';
import { HookContext } from '@feathersjs/feathers';

export default async (context: HookContext) => {
  const { data } = context;
  if (data?.type !== 'direct') return context;
  const { userIds } = data;
  const { Conversation, User: ConversationUsers } =
    context.app.get('sequelizeClient').models;

  const {
    params: { User },
  } = context;

  try {
    const existingConversation = await Conversation.findOne({
      where: { type: 'direct' },
      include: [
        {
          model: ConversationUsers,
          where: { id: { [Op.or]: [...userIds, User.id] } },
          attributes: ['id'],
        },
      ],
    });

    if (existingConversation) {
      context.result = existingConversation;
      context.data.userIds = null;
    }
  } catch (err) {
    throw new Error(err.message);
  }
  return context;
};
