/* eslint-disable no-case-declarations */
import * as authentication from '@feathersjs/authentication';

import { AddTalker } from '../../Hooks';



import {
  SetType,
  UnreadMessage,
  LimitToTalkersOnly,
  FilterConversations,
  IncludeUserAndLastMessage,
  LimitDirectConversations,
} from './hook';

const NotifyUsers = async (context) => {

  const { app, data, result } = context;
  if(!data?.userIds) return context;
  // console.log('\n\n NotifyUsers');
  // console.log('User ids');
  // console.log(data.userIds);
  try {
    const connections = [...data.userIds].map(
      (userId) => app.channel(`userIds-${userId}`).connections
    );
    connections.forEach((connection) => {
      app.channel(`conversation-${result.id}`).join(connection);
      // app.service('conversation').publish('created', (v) =>
      //   app.channel(`conversation-${result.id}`).send({
      //     name: 'data.name',
      //     v,
      //   })
      // );
    });
  } catch (error) {
    console.log('soem error notifying them');
    console.log(error);
  }

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
      UnreadMessage,
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
