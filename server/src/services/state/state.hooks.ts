import { disablePagination, disallow } from 'feathers-hooks-common';
import * as authentication from '@feathersjs/authentication';
import OrderBy from '../../Hooks/OrderBy.hooks';
// Don't remove this comment. It's needed to format import lines nicely.

const { authenticate } = authentication.hooks;

const notAllow = disallow('external');
export default {
  before: {
    all: [authenticate('jwt')],
    find: [disablePagination(), OrderBy({ name: 1 })],
    get: notAllow,
    create: notAllow,
    update: notAllow,
    patch: notAllow,
    remove: notAllow,
  },
};
