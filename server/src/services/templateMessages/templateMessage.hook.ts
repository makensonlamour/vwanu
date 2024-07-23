import * as feathersAuthentication from '@feathersjs/authentication';

const { authenticate } = feathersAuthentication.hooks;

export default {
  before: {
    all: [authenticate('jwt')],
  },
};
