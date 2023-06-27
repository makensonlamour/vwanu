import { disallow } from 'feathers-hooks-common';
import * as feathersAuthentication from '@feathersjs/authentication';

/** Local dependencies */
import allowAnonymous from '../../Hooks/AllowAnonymous';
import verifyData from './hooks/verification.hook';

const { authenticate } = feathersAuthentication.hooks;
const notAllow = disallow('external');

export default {
  before: {
    all: allowAnonymous(),
    find: notAllow,
    get: notAllow,
    create: [authenticate('jwt', 'anonymous'), verifyData],
    update: notAllow,
    patch: notAllow,
    remove: notAllow,
  },
};
