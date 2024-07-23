import * as authentication from '@feathersjs/authentication';
import { BadRequest } from '@feathersjs/errors';

const { authenticate } = authentication.hooks;


export default {
  before: {
    all: [],
    get: [authenticate('jwt')],
    find: [authenticate('jwt')],
    create: [() => { throw new BadRequest('You are not allowed to create a notification type') }],
    update: [() => { throw new BadRequest('You are not allowed to update a notification type') }],
    patch: [() => { throw new BadRequest('You are not allowed to update a notification type') }],
    remove: [() => { throw new BadRequest('You are not allowed to delete a notification type') }],
  },

};
