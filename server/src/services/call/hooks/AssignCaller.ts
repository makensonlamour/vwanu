import { HookContext } from '@feathersjs/feathers';

export default (context: HookContext): HookContext => {
  context.data.callerId = context.params.User.id;
  return context;
};
