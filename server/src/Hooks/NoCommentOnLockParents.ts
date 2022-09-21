import { HookContext } from '@feathersjs/feathers';
import hasProperty from 'lodash/has';
import { BadRequest } from '@feathersjs/errors';

export default async (context: HookContext) => {
  const { data } = context;
  const entityName = context.service.options.Model.name;
  const parentColumn = `${entityName}Id`;
  if (!hasProperty(data, parentColumn)) return context;
  // eslint-disable-next-line no-underscore-dangle
  const parent = await context.app
    .service(context.path)
    ._get(data[parentColumn]);
  if (parent.locked) {
    throw new BadRequest('Parent is locked');
  }

  return context;
};
