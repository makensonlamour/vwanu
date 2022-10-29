import * as authentication from '@feathersjs/authentication';
// import { disallow } from 'feathers-hooks-common';
// Don't remove this comment. It's needed to format import lines nicely.
const { authenticate } = authentication.hooks;

// const notAllow = disallow('external');
export default {
  before: {
    all: [authenticate('jwt')],
    // get: notAllow,
    // create: notAllow,
    // update: notAllow,
    // patch: notAllow,
    // remove: notAllow,
  },
};
