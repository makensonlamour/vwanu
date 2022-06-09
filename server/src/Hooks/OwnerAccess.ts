import { BadRequest } from '@feathersjs/errors';

import { HookContext } from '@feathersjs/feathers';

export default (queries) => (context: HookContext) => {
  if (!context.params.provider) return context;
  const { params, type } = context;
  const { query } = params;
  const originalQuery = { ...query };

  switch (type) {
    case 'before':
      Object.keys(queries).forEach((key) => {
        if (!originalQuery[key]) query[key] = queries[key];
      });
      if (
        query.UserId &&
        query.UserId.toString() === params.User.id.toString()
      ) {
        Object.keys(queries).forEach((key) => {
          if (!originalQuery[key]) delete query[key];
        });
      }
      break;
    case 'after':
      if (context.result.UserId === params.User.id) return context;

      if (
        Object.keys(queries).every(
          (key) => context.result[key] === queries[key]
        )
      )
        return context;

      throw new BadRequest('You cannot review this item');
    default:
      throw new Error('This is not supported');
  }
  return context;
};
