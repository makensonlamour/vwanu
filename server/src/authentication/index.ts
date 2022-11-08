/* eslint-disable class-methods-use-this */
/* eslint-disable max-classes-per-file */
/* eslint-disable no-unused-vars */
import { ServiceAddons } from '@feathersjs/feathers';
import { AuthenticationService, JWTStrategy } from '@feathersjs/authentication';

import { LocalStrategy } from '@feathersjs/authentication-local';
import * as local from '@feathersjs/authentication-local';

import { expressOauth } from '@feathersjs/authentication-oauth';
import { issueRefreshToken } from '@jackywxd/feathers-refresh-token';
import { Application } from '../declarations';
import { GoogleStrategy, AnonymousStrategy } from './strategies';

const { protect } = local.hooks;
declare module '../declarations' {
  // eslint-disable-next-line no-unused-vars
  interface ServiceTypes {
    authentication: AuthenticationService & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const authentication = new AuthenticationService(app);

  authentication.register('jwt', new JWTStrategy());
  authentication.register('local', new LocalStrategy());
  authentication.register('anonymous', new AnonymousStrategy());
  // authentication.register('facebook', new FacebookStrategy());
  authentication.register('google', new GoogleStrategy());

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
