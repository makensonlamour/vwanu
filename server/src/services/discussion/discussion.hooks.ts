import * as authentication from '@feathersjs/authentication';
// Don't remove this comment. It's needed to format import lines nicely.
import AutoOwn from '../../Hooks/AutoOwn';
import LimitToOwner from '../../Hooks/LimitToOwner';
import NoCommentOnLockParents from '../../Hooks/NoCommentOnLockParents';

import { includeUserAndLastComment } from './hooks';

const { authenticate } = authentication.hooks;

export default {
  before: {
    all: [authenticate('jwt')],
    find: [includeUserAndLastComment(false)],
    get: [includeUserAndLastComment(true)],
    create: [AutoOwn, NoCommentOnLockParents],
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
