import * as authentication from '@feathersjs/authentication';

import PatchWorkplace from './hooks/EditWorkplace.hook';
import RemoveWorkplace from './hooks/RemoveWorkplace.hook';

const { authenticate } = authentication.hooks;

export default {
  before: {
    all: authenticate('jwt'),
    patch: PatchWorkplace,
    remove: RemoveWorkplace,
  },
};
