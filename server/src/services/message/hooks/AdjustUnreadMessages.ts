import { HookContext } from '@feathersjs/feathers';
import { AdjustCount } from '../../../Hooks';

const AdjustCountOptions = {
  model: 'Conversation',
  field: 'amountOfUnreadMessages',
  key: 'ConversationId',
};

const AdjustUnreadMessageInConversation = (context: HookContext) => {
  const { method, result } = context;
  if (method !== 'create' && method !== 'patch')
    throw new Error('Only supported for create and patch methods');
  if (method === 'create') return AdjustCount(AdjustCountOptions)(context);
  if (method === 'patch')
    if (result.read)
      return AdjustCount({ ...AdjustCountOptions, increment: false })(context);
    else return context;

  return context;
};

export default AdjustUnreadMessageInConversation;
