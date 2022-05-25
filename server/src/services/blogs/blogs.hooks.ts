import * as authentication from '@feathersjs/authentication';
import LimitToOwner from '../../Hooks/LimitToOwner';
// import isSelfHook from '../../Hooks/isSelf.hook';
// Don't remove this comment. It's needed to format import lines nicely.

const { authenticate } = authentication.hooks;

export default {
  before: {
    all: [authenticate('jwt')],
    find: [
      (context) => {
        const { params } = context;
        const { query } = params;
        query.privacyType = 'public';
        if (
          query.UserId &&
          query.UserId.toString() === params.User.id.toString()
        )
          delete query.privacyType;
        return context;
      },
    ],
    get: [],
    create: [
      (context) => {
        const { data, params } = context;
        data.UserId = params.User.id;
        return context;
      },
    ],
    update: [LimitToOwner],
    patch: [LimitToOwner],
    remove: [LimitToOwner],
  },

  after: {
    all: [],
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
