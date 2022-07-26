import { HookContext } from '@feathersjs/feathers';
import { BadRequest } from '@feathersjs/errors';
import AdjustCount from './AdjustCount';

export default async (context: HookContext) => {
  //   console.log('context');
  const { data } = context;
  if (!data.userIds) throw new BadRequest('userIds is required');
  //   console.log(' Here we have');
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
  //   console.log('users added');
  const updateUserCount = AdjustCount({
    model: 'Conversation',
    field: 'amountOfPeople',
    key: context.result.id,
    foreignId: context.result.id,
    incremental: addedUser.length,
  });

  await updateUserCount(context);
  //   console.log('users updated');

  return context;
};
