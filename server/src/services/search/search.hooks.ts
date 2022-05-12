import * as local from '@feathersjs/authentication-local';
import { disallow } from 'feathers-hooks-common';
import * as authentication from '@feathersjs/authentication';
import MediaStringToMediaObject from '../../Hooks/ProfileCoverToObject';
import modifyQueryForSearch from './modifyQueryForSearch';

const { authenticate } = authentication.hooks;
const { protect } = local.hooks;
export default {
  before: {
    all: [authenticate('jwt')],
    find: [modifyQueryForSearch({ searchColumn: 'search_vector' })],
    get: [disallow()],
    create: [disallow()],
    update: [disallow()],
    patch: [disallow()],
    remove: [disallow()],
  },

  after: {
    all: [
      protect(
        ...[
          'password',
          'verifyToken',
          'resetToken',
          'resetShortToken',
          'resetExpires',
          'verifyShortToken',
          'activationKey',
          'resetPasswordKey',
          'verifyExpires',
          'search_vector',
        ]
      ),
    ],
    find: [],
    get: [MediaStringToMediaObject(['profilePicture'])],
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
