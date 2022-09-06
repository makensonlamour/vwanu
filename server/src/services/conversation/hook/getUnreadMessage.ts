/* eslint-disable camelcase */
import { HookContext } from '@feathersjs/feathers';
import { Op } from '@sequelize/core';
import isNill from 'lodash/isNil';

export default async (context: HookContext) => {
  const { app, result, params } = context;
  if (isNill(params.provider)) return context;
  const { id } = result;

  const { Message } = app.get('sequelizeClient').models;
  const amountOfUnreadMessages = await Message.count({
    where: {
      ConversationId: id,
      read: false,
      senderId: { [Op.ne]: params.User.id },
    },
  });
  result.amountOfUnreadMessages = amountOfUnreadMessages;
  context.result = result;
  return context;
};
