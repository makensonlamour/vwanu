import {
  AuthenticationBaseStrategy,
  AuthenticationResult,
} from '@feathersjs/authentication';

import { Params } from '@feathersjs/feathers';

export default class AnonymousStrategy extends AuthenticationBaseStrategy {
  // eslint-disable-next-line class-methods-use-this, no-unused-vars
  async authenticate(authentication: AuthenticationResult, params: Params) {
    return {
      anonymous: true,
    };
  }
}
