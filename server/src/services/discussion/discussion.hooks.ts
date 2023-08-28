import * as authentication from '@feathersjs/authentication';
// Don't remove this comment. It's needed to format import lines nicely.
import AutoOwn from '../../Hooks/AutoOwn';
import LimitToOwner from '../../Hooks/LimitToOwner';
import NoCommentOnLockParents from '../../Hooks/NoCommentOnLockParents';
import CanDiscussInCommunity from '../../Hooks/CanDoInCommunity.hook';

import { includeUserAndLastComment, AssociateWithForumInterest } from './hooks';

const { authenticate } = authentication.hooks;

export default {
  before: {
    all: [authenticate('jwt')],
    find: [includeUserAndLastComment(false)],
    get: [includeUserAndLastComment(true)],
    create: [AutoOwn, CanDiscussInCommunity, NoCommentOnLockParents],
    update: [LimitToOwner],
    patch: [LimitToOwner],
    remove: [LimitToOwner],
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [AssociateWithForumInterest],
    update: [],
    patch: [],
    remove: [],
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [
      (ctx) => {
        console.log('Error in discussion create hook');
        console.log(ctx.error);
        return ctx;
      },
    ],
    update: [],
    patch: [],
    remove: [],
  },
};
