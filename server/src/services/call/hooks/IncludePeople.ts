/* eslint-disable no-return-await */
// import { fastJoin } from 'feathers-hooks-common';
import { HookContext } from '../../../app';

// export const resolvers = {
//   joins: {
//     caller: () => async (call, context) =>
//       await context.app.service('users').get(call.callerId),
//     receiver: () => async (call, context) =>
//       await context.app.service('users').get(call.receiverId),
//   },
// };

// export const query = {
//   caller: true,
//   receiver: true,
// };

export default async (context: HookContext): Promise<HookContext> => {
  try {
    context.result.caller = await context.app
      .service('users')
      .get(context.data.callerId);
    context.result.receiver = await context.app
      .service('users')
      .get(context.data.receiverId);
  } catch (error) {
    console.log('error in include people');
    console.log(error);
  }

  return context;
};
