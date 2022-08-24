import { AdjustCount } from '../../../Hooks';

const AdjustCountOptions = {
  model: 'Conversation',
  field: 'amountOfMessages',
  key: 'ConversationId',
};

const AdjustAmountMessagesInConversation = AdjustCount(AdjustCountOptions);

export default AdjustAmountMessagesInConversation;
