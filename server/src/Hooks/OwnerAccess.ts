import { HookContext } from '@feathersjs/feathers';

export default (queries) => (context: HookContext) => {
  const { params } = context;
  const { query } = params;
  const originalQuery = { ...query };
  Object.keys(queries).forEach((key) => {
    if (!originalQuery[key]) query[key] = queries[key];
  });
  if (query.UserId && query.UserId.toString() === params.User.id.toString()) {
    Object.keys(queries).forEach((key) => {
      if (!originalQuery[key]) delete query[key];
    });
  }
  return context;
};
