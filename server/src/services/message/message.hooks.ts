// import { HooksObject } from '@feathersjs/feathers';
import * as authentication from '@feathersjs/authentication';
// Don't remove this comment. It's needed to format import lines nicely.

import {
  AddSender,
  NewestFirst,
  PublishMessage,
  AdjustReadAndReceivedDate,
  IncludeSenderAndConversation,
  AdjustAmountMessagesInConversation,
  AdjustUnreadMessageInConversation,
} from './hooks';

const { authenticate } = authentication.hooks;

export default {
  before: {
    all: [authenticate('jwt'), IncludeSenderAndConversation],
    find: [NewestFirst],
    get: [],
    create: [AddSender],
    update: [],
    patch: [AdjustReadAndReceivedDate],
    remove: [],
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [
      AdjustAmountMessagesInConversation,
      AdjustUnreadMessageInConversation,
      PublishMessage,
    ],
    update: [],
    patch: [AdjustUnreadMessageInConversation, PublishMessage],
    remove: [AdjustAmountMessagesInConversation],
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },
};
