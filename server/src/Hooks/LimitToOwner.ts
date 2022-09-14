/* eslint-disable no-underscore-dangle */
import { HookContext } from '@feathersjs/feathers';
import { BadRequest } from '@feathersjs/errors';


export default async (context: HookContext) => {
  const { params, id, service } = context;

  const entity = await service._get(id);

  if (entity.UserId && entity.UserId !== params.User.id) {
    throw new BadRequest('Not authorized');
  }

  return context;
};
