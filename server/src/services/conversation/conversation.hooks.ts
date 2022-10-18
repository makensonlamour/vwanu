/* eslint-disable no-case-declarations */
import * as authentication from '@feathersjs/authentication';

import { AddTalker } from '../../Hooks';

import {
  SetType,
  // UnreadMessage,
  LimitToTalkersOnly,
  FilterConversations,
  // IncludeUserAndLastMessage,
  LimitDirectConversations,
} from './hook';

const NotifyUsers = async (context) => {
  const { app, data, result } = context;
  if (!data?.userIds) return context;
  console.log('\n\n NotifyUsers');
  console.log('User ids');
  console.log(data.userIds);
  console.log('Channels ');
  console.log(app.channels);

  console.log(app.channel(app.channels).connections);
  try {
    if (!app.channel(app.channels).length) return context;
    const cons = [...data.userIds, context.params.User.id].map((userId) => {
      const { connections } = app.channel(`userIds-${userId}`);
      console.log(`For id ${userId} the connection is ${connections}`);
      return connections;
    });
    console.log('Here is what connections contains');
    console.log({ cons });
    cons.forEach((connection) => {
      app.channel(`conversation-${result.id}`).join(connection);
      // app.service('conversation').publish('created', (v) =>
      //   app.channel(`conversation-${result.id}`).send({
      //     name: 'data.name',
      //     v,
      //   })
      // );
    });
  } catch (error) {
    console.error(error);
  }

  return context;
};

const { authenticate } = authentication.hooks;
/* LimitDirectConversations */
export default {
  before: {
    all: [authenticate('jwt')],
    find: [FilterConversations],
    get: [FilterConversations],
    create: [SetType, LimitDirectConversations],
    update: [],
    patch: [LimitToTalkersOnly],
    remove: [LimitToTalkersOnly],
  },

  after: {
    all: [],
    find: [],
    get: [],
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
