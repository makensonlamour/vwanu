/* eslint-disable no-case-declarations */
import * as authentication from '@feathersjs/authentication';
import commonHooks from 'feathers-hooks-common';

/** Local dependencies */
import { AddTalker, AgeAllow, } from '../../Hooks';
import {
  SetType,
  NotifyUsers,
  LimitToTalkersOnly,
  FilterConversations,
  LimitDirectConversations,
} from './hook';

const { authenticate } = authentication.hooks;

export default {
  before: {
    all: [authenticate('jwt'), AgeAllow],
    find: [FilterConversations],
    get: [FilterConversations],
    create: [SetType, LimitDirectConversations],
    update: [commonHooks.disallow('external')],
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
