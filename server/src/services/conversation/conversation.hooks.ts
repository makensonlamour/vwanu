/* eslint-disable no-case-declarations */
import * as authentication from '@feathersjs/authentication';
import isNill from 'lodash/isNil';
import { AddTalker } from '../../Hooks';

import {
  SetType,
  LimitToTalkersOnly,
  FilterConversations,
  IncludeUserAndLastMessage,
  LimitDirectConversations,
} from './hook';

const NotifyUsers = async (context) => {
  const { app, data, result, params } = context;
  if (isNill(data.userIds)) return context;
  const connections = [...data.userIds, params.User.id].map(
    (userId) => app.channel(`userIds/${userId}`).connections
  );
  connections.forEach((connection) => {
    app.channel(`conversation-${result.id}`).join(connection);
  });

  return context;
};

const { authenticate } = authentication.hooks;
/* LimitDirectConversations */
export default {
  before: {
    all: [authenticate('jwt'), IncludeUserAndLastMessage],
    find: [FilterConversations],
    get: [LimitToTalkersOnly],
    create: [SetType, LimitDirectConversations],
    update: [],
    patch: [LimitToTalkersOnly],
    remove: [LimitToTalkersOnly],
  },

  after: {
    all: [],
    find: [
      /* Todo setConversationName */
    ],
    get: [
      /* Todo setConversationName  */
    ],
    create: [AddTalker, NotifyUsers],
    update: [],
    patch: [],
    remove: [],
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
