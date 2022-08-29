export default async (context) => {
  if (
    !context.params.provider ||
    !context.params.User ||
    !context.id ||
    context.params.User.id === context.id
  )
    return context;

  try {
    await context.app.service('userVisitor').create({
      UserId: context.id,
      VisitorId: context.params.User.id,
    });

    await context.app.service('notification').create({
      UserId: context.params.User.id,
      to: context.id,
      message: 'Visited your profile',
      type: 'direct',
      entityName: 'users',
      entityId: context.id,
    });
  } catch (error) {
    throw new Error(error);
  }

  return context;
};
