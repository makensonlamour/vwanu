import { HookContext } from '@feathersjs/feathers';
import { BadRequest } from '@feathersjs/errors';
import isNil from 'lodash/isNil';

export default async (context: HookContext) => {
  const { params, app } = context;
  if (isNil(params.provider)) return context;
  if (context.type !== 'before')
    throw new Error('This hook is only meant to be used as a before hook.');
  if (isNil(context.id))
    throw new Error('You must provide an id to this hook.');
  if (isNil(params.User.id))
    throw new Error('Only authenticated users can access this service.');

  // eslint-disable-next-line camelcase
  const { Conversation_Users } = app.get('sequelizeClient').models;

  // eslint-disable-next-line camelcase
  const result = await Conversation_Users.findOne({
    where: { UserId: params.User.id, ConversationId: context.id },
  });
  if (!result)
    throw new BadRequest('You are not allowed to access this conversation.');
  // context.result = result;

  return context;
};
