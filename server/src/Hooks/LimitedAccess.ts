import { HookContext } from '@feathersjs/feathers';

export default (queries) => (context: HookContext) => {
  const { type, params } = context;
  if (!context.params.provider) return context;
  if (type !== 'after') return context;

  if (!Array.isArray(context.result) && !Array.isArray(context.result.data))
    return context;

  const data = context?.result?.data ? context?.result?.data : context?.result;

  context.result = data.filter((item) => {
    if (params.User.id === item.UserId) return true;
    return Object.keys(queries).every((key) => item[key] === queries[key]);
  });
  return context;
};
