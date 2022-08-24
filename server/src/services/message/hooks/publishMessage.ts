import { HookContext } from '@feathersjs/feathers';

export default (context: HookContext) => {
  const { app, result } = context;

  const { ConversationId } = result;
  if (!ConversationId)   return context;
  app
    .service('messages')
    .publish(() => app.channel(`conversation/${ConversationId}`));
  return context;
};
