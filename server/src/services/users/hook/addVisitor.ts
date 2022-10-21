import { HookContext } from '@feathersjs/feathers';

export default async (context: HookContext): Promise<HookContext> => {
  if (
    !context?.result?.id ||
    !context.params.provider ||
    !context.params.User ||
    !context.id ||
    context.params.User.id === context.id ||
    !context.params?.User?.eVisitedNotified
  )
    return context;

  try {
    await context.app.service('userVisitor').create({
      UserId: context.id,
      VisitorId: context.params.User.id,
    });

    await context.app.service('notification').create({
      UserId: context.params.User.id,
      to: context.result.id,
      message: 'Visited your profile',
      type: 'direct',
      entityName: 'users',
      entityId: context.params.User.id,
    });
  } catch (error) {
    throw new Error(error);
  }

  return context;
};
