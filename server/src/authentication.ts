/* eslint-disable max-classes-per-file */
/* eslint-disable no-unused-vars */
import { ServiceAddons, Params } from '@feathersjs/feathers';
import {
  AuthenticationService,
  AuthenticationBaseStrategy,
  AuthenticationResult,
  JWTStrategy,
  AuthenticationRequest,
} from '@feathersjs/authentication';

import { LocalStrategy } from '@feathersjs/authentication-local';
import * as local from '@feathersjs/authentication-local';

import {
  expressOauth,
  OAuthStrategy,
  OAuthProfile,
} from '@feathersjs/authentication-oauth';
import axios from 'axios';
import { issueRefreshToken } from '@jackywxd/feathers-refresh-token';
import { Application } from './declarations';

const { protect } = local.hooks;
declare module './declarations' {
  // eslint-disable-next-line no-unused-vars
  interface ServiceTypes {
    authentication: AuthenticationService & ServiceAddons<any>;
  }
}

class FacebookStrategy extends OAuthStrategy {
  // eslint-disable-next-line class-methods-use-this
  async getProfile(authResult: AuthenticationRequest, _params: Params) {
    console.log('****** In Get Profile Data ******\n\n');
    console.log('authResult', authResult);
    console.log('Getting access token');
    // This is the OAuth access token that can be used
    // for Facebook API requests as the Bearer token
    const accessToken = authResult.access_token;
    console.log('accessToken', accessToken);
    const { data } = await axios.get('https://graph.facebook.com/me', {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
      params: {
        // There are
        fields: 'id,name,email',
      },
    });

    console.log('data', data);
    return data;
  }

  async getEntityData(profile: OAuthProfile, existing: any, params: Params) {
    console.log('****** In Get Entity Data ******\n\n');
    console.log('profile', profile);
    // `profile` is the data returned by getProfile
    const baseData = await super.getEntityData(profile, existing, params);

    return {
      ...baseData,
      email: profile.email,
    };
  }
}

class GoogleStrategy extends OAuthStrategy {
  async getEntityData(profile: OAuthProfile, existing: any, params: Params) {
    console.log('****** In Get Entity Data ******\n\n');
    console.log({ profile, existing });
    // this will set 'googleId'

    const baseData = await super.getEntityData(profile, existing, params);

    // this will grab the picture and email address of the Google profile
    return {
      ...baseData,
      isVerified: true,
      profilePicture: profile.picture,
      email: profile.email,
    };
  }
}
class AnonymousStrategy extends AuthenticationBaseStrategy {
  // eslint-disable-next-line class-methods-use-this
  async authenticate(authentication: AuthenticationResult, params: Params) {
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
  authentication.register('facebook', new FacebookStrategy());
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
