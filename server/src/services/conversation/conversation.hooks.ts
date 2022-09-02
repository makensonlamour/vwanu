/* eslint-disable no-case-declarations */

import * as authentication from '@feathersjs/authentication';

import {
  AddTalker,
  // AutoOwn,
  // LimitToOwner,
} from '../../Hooks';

import {
  FilterConversations,
  LimitToTalkersOnly,
  IncludeUserAndLastMessage,
} from './hook';

const NotifyUsers = async (context) => {
  const { app, data, result } = context;
  console.log('\n\n NotifyUsers');
  console.log('User ids');
  console.log(data.userIds);
  try {
    const connections = [...data.userIds].map(
      (userId) => app.channel(`userIds/${userId}`).connections
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

export default {
  before: {
    all: [authenticate('jwt'), IncludeUserAndLastMessage],
    find: [FilterConversations],
    get: [LimitToTalkersOnly],
    create: [],
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
