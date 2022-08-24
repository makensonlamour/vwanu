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

// const isDirect = (conversation) =>
//   conversation.name === 'direct' && conversation.name !== null;

// const setName = (conversation, users, against) => {
//   const name = users
//     .filter((user) => {
//       if (user.id !== against) return `${user.firstName} ${user.lastName[0]}`;
//       return null;
//     })
//     .split(' , ');
//   return { ...conversation, name };
// };

// const setConversationName = (ctx) => {
//   const { type, result, method, params } = ctx;

//   if (
//     type === 'before' ||
//     !result ||
//     !['find', 'get'].some((val) => val === method)
//   )
//     return ctx;
//   switch (method) {
//     case 'get':
//       if (!isDirect(result)) return ctx;
//       const name = setName(result, result.Users, params.User.id);

//       break;

//     case 'find':
//       const newData = result.map((res) => {
//         // if (isDirect(result)) return ctx;
//         const names = setName(res, res.Users, params.User.id);

//         return name;
//       });
//       break;
//     default:
//       break;
//   }

//   return ctx;
// };

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
    create: [AddTalker],
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
