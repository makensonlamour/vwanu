import * as authentication from '@feathersjs/authentication';
import { BadRequest } from '@feathersjs/errors';

import autoOwn from '../../Hooks/AutoOwn';

const { authenticate } = authentication.hooks;

export default {
  before: {
    all: [authenticate('jwt')],
    get: [authenticate('jwt')],
    find: [authenticate('jwt')],
    create: [() => { throw new BadRequest('You are not allowed to create a notification type') }],
    update: [() => { throw new BadRequest('You are not allowed to update a notification type') }],
    patch: [autoOwn],
    remove: [() => { throw new BadRequest('You are not allowed to delete a notification type') }],
  },

};
