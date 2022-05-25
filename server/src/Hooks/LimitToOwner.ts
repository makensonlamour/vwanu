import { HookContext } from '@feathersjs/feathers';
import { BadRequest } from '@feathersjs/errors';

export default async (context: HookContext) => {
  const { params, id } = context;

  const entity = await context.app.service(context.path).get(id);
  if (entity.UserId && entity.UserId !== params.User.id) {
    throw new BadRequest('Not authorized');
  }
  return context;
};
