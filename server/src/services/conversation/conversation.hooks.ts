/* eslint-disable no-case-declarations */
// import { HookContext } from '@feathersjs/feathers';
// import { BadRequest } from '@feathersjs/errors';
import * as authentication from '@feathersjs/authentication';
// Don't remove this comment. It's needed to format import lines nicely.

import {
  AddTalker,
  // AutoOwn,
  // LimitToOwner,
  // IncludeAssociations,
  AddAssociations,
} from '../../Hooks';

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
    all: [
      authenticate('jwt'),
      AddAssociations({
        models: [
          {
            model: 'users',
            attributes: ['id', 'firstName', 'lastName', 'profilePicture'],
          },
        ],
      }),
    ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },

  after: {
    all: [],
    find: [
      /* setConversationName */
    ],
    get: [
      /* setConversationName */
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
