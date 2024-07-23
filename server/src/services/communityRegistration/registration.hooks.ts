import * as authentication from '@feathersjs/authentication';
// Don't remove this comment. It's needed to format import lines nicely.
import { disallow } from 'feathers-hooks-common';
import AgeAllow from '../../Hooks/AgeAllow';

const { authenticate } = authentication.hooks;

export default {
  before: {
    all: [authenticate('jwt'), AgeAllow],
    find: disallow(),
    get: disallow(),
    create: [],
    update: disallow(),
    patch: disallow(),
    remove: disallow(),
  },

};
