import { HookContext } from '@feathersjs/feathers';

export default (context: HookContext) => {
  const { query = {} } = context.params;

  if (!query.$sort) {
    query.$sort = {
      createdAt: 1,
    };
  }
  context.params.query = query;

  return context;
};
