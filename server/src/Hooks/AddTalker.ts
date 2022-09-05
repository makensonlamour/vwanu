import { HookContext } from '@feathersjs/feathers';
import { GeneralError } from '@feathersjs/errors';
import isNill from 'lodash/isNil';
import AdjustCount from './AdjustCount';

export default async (context: HookContext) => {
  const { data } = context;
  if (isNill(data.userIds)) return context;

  const addedUser = await Promise.all(
    [...data.userIds, context.params.User.id].map((userId) =>
      context.app
        .get('sequelizeClient')
        .models.Conversation_Users.findOrCreate({
          where: {
            UserId: userId,
            ConversationId: context.result.id,
          },
        })
    )
  );

  const updateUserCount = AdjustCount({
    model: 'Conversation',
    field: 'amountOfPeople',
    key: context.result.id,
    foreignId: context.result.id,
    incremental: addedUser.length,
  });

  try {
    await updateUserCount(context);
    context.result.amountOfPeople = addedUser.length;
  } catch (e) {
    throw new GeneralError(e.message);
  }

  return context;
};
