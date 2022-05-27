import { ServiceAddons, Params } from '@feathersjs/feathers';
import {
  AuthenticationService,
  AuthenticationBaseStrategy,
  AuthenticationResult,
  JWTStrategy,
} from '@feathersjs/authentication';

import { LocalStrategy } from '@feathersjs/authentication-local';
import * as local from '@feathersjs/authentication-local';

import { expressOauth } from '@feathersjs/authentication-oauth';
import { issueRefreshToken } from '@jackywxd/feathers-refresh-token';
import { Application } from './declarations';

const { protect } = local.hooks;
declare module './declarations' {
  // eslint-disable-next-line no-unused-vars
  interface ServiceTypes {
    authentication: AuthenticationService & ServiceAddons<any>;
  }
}

class AnonymousStrategy extends AuthenticationBaseStrategy {
  // eslint-disable-next-line class-methods-use-this
  async authenticate(authentication: AuthenticationResult, params: Params) {
    console.log({ authentication, params });
    return {
      anonymous: true,
    };
  }
}

export default function (app: Application): void {
  const authentication = new AuthenticationService(app);

  authentication.register('jwt', new JWTStrategy());
  authentication.register('local', new LocalStrategy());
  authentication.register('anonymous', new AnonymousStrategy());

  app.use('/authentication', authentication);
  const service = app.service('authentication');

  // @ts-ignore
  service.hooks({
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
            'isVerified',
            'verifyToken',
            'verifyExpires',
            'verifyChanges',
            'activationKey',
          ]
        ),
      ],
      create: [issueRefreshToken()],
    },
  });
  app.configure(expressOauth());
}
