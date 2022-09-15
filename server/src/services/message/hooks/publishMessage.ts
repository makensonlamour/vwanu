import { HookContext } from '@feathersjs/feathers';

export default (context: HookContext) => {
  const { result } = context;

  const { ConversationId } = result;
  if (!ConversationId) return context;
  // app
  //   .service('message')
  //   .publish(() => app.channel(`conversation-${ConversationId}`));
  return context;
};
