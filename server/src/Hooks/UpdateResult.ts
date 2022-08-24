import { HookContext } from '@feathersjs/feathers';

export default async (context: HookContext) => {
  if (context.type !== 'after')
    throw new Error(`This hook should only be used as an 'after' hook.`);
  if (!context.result) return context;
  const { path, app } = context;
  const { id, ...data } = context.result;

  if (id) {
    const updatedData = await app.service(path).get(id);
    context.result = { ...data, ...updatedData };
  }

  return context;
};
