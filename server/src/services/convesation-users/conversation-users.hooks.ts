// import { HooksObject } from '@feathersjs/feathers';
import * as authentication from '@feathersjs/authentication';
// Don't remove this comment. It's needed to format import lines nicely.
// import { AddAssociations, IncludeAssociations } from '../../Hooks';

import AgeAllow from '../../Hooks/AgeAllow';

const { authenticate } = authentication.hooks;

const findConversationsFrom = async ({ app, conversationId }) => {
  try {
    const conversations = await app.service('conversation').get(conversationId);

    return conversations;
  } catch (e) {
    throw new Error(e);
  }
};
const AssociateConversation = async (ctx) => {
  const { result, app } = ctx;
  if (!result) return ctx;
  let response;
  if (Array.isArray(result)) {
    response = await Promise.all(
      result.map((conversation) =>
        findConversationsFrom({
          app,
          conversationId: conversation.ConversationId,
        })
      )
    );
  } else {
    response = await findConversationsFrom({
      app,
      conversationId: result.ConversationId,
    });
  }

  if (!response || !response.length) return ctx;

  ctx.result = response;
  return ctx;
};
export default {
  before: {
    all: [
      authenticate('jwt'),
      AgeAllow
      // IncludeAssociations({
      //   include: [
      //     {
      //       model: 'conversation',
      //       as: 'User',
      //     },
      //   ],
      // }),
      // AddAssociations({
      //   models: [{ model: 'conversation' }],
      // }),
    ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },

  after: {
    all: [AssociateConversation],
    find: [],
    get: [],
    create: [],
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
