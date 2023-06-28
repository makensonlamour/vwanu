import { HookContext } from '@feathersjs/feathers';

export default async (context: HookContext): Promise<HookContext> => {
  if (
    !context?.result?.id ||
    !context.params.provider ||
    !context.params.User ||
    !context.id
    // !context.params?.User?.eVisitedNotified
  )
    return context;

  const { data, result } = context;
  try {
    const msgVerb = data.accept ? 'Accepted' : 'Rejected';

    await context.app.service('notification').create({
      UserId: context.params.User.id,
      to: result.id,
      message: `${msgVerb} your friend request`,
      type: 'direct',
      entityName: 'users',
      entityId: context.params.User.id,
    });
  } catch (error) {
    throw new Error(error);
  }

  return context;
};
