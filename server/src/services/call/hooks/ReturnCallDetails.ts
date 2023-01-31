import { HookContext } from '@feathersjs/feathers';

export default (context: HookContext): HookContext => {
  if (context.data.callDetails)
    context.result.details = context.data.callDetails;
  return context;
};
