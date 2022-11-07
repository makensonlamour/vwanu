/* eslint-disable class-methods-use-this */
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
import { Application } from '../declarations';
import Strategy from './OAuth';

const { protect } = local.hooks;
declare module '../declarations' {
  // eslint-disable-next-line no-unused-vars
  interface ServiceTypes {
    authentication: AuthenticationService & ServiceAddons<any>;
  }
}

// class FacebookStrategy extends OAuthStrategy {
//   // eslint-disable-next-line class-methods-use-this
//   async getProfile(authResult: AuthenticationRequest, _params: Params) {
//     console.log('****** In Get Profile Data  ******\n\n');
//     console.log('authResult', authResult);
//     console.log('Getting access token');
//     // This is the OAuth access token that can be used
//     // for Facebook API requests as the Bearer token
//     const accessToken = authResult.access_token;
//     console.log('accessToken', accessToken);
//     const { data } = await axios.get('https://graph.facebook.com/me', {
//       headers: {
//         authorization: `Bearer ${accessToken}`,
//       },
//       params: {
//         // There are
//         fields: 'id,name,email',
//       },
//     });

//     console.log('data', data);
//     return data;
//   }

//   async getEntityData(profile: OAuthProfile, existing: any, params: Params) {
//     console.log('****** In Get Entity Data ******\n\n');
//     console.log('profile', profile);
//     // `profile` is the data returned by getProfile
//     const baseData = await super.getEntityData(profile, existing, params);

//     return {
//       ...baseData,
//       email: profile.email,
//     };
//   }
// }

class GoogleStrategy extends OAuthStrategy {
  async getRedirect(authResult) {
    console.log('**** REDIRECCTIING *****\n\n\n');
    console.log(authResult);
    console.log(Object.keys(authResult));

    return `http://localhost:3000?access_token=${authResult.accessToken}`;
  }

  // eslint-disable-next-line class-methods-use-this
  async getProfile(authResult) {
    console.log('**** In Getting profile methods*****\n\n\n');
    // eslint-disable-next-line prefer-destructuring
    const accessToken = authResult?.access_token;
    const { data }: any = await axios
      .get(
        `https://openidconnect.googleapis.com/v1/userinfo?access_token=${accessToken}`
      )
      .then((res) => res)
      .catch((err) => {
        console.log('eroor getting open id');
        console.log(err);
      });

    console.log('The data', data);
    return data;
    // This is the OAuth access token that can be used
    // for Facebook API requests as the Bearer token
    // const accessToken = authResult.access_token;
    // const { email } = authResult.payload;
    // console.log('\n\n\n Here is the user email ', email);
    // check the user exists in our db,

    //
  }

  async getEntityQuery(profile, params) {
    console.log('Entity query ');
    console.log(profile, params);

    return {
      email: profile.email,
    };
  }

  async findEntity(profile, params) {
    console.log('FIND ENTITY ');
    // eslint-disable-next-line no-underscore-dangle
    try {
      const user = await this.app.get('sequelizeClient').models.User.findOne({
        where: { email: profile.email },
      });
      return user;
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  async createEntity(profile, params) {
    const user = {
      lastName: profile.given_name,
      firstName: profile.family_name,
      profilePicture: profile.picture,
      verified: profile.email_verified,
      password: '123456789',
      passwordConfirmation: '123456789',
      email: profile.email,
    };
    console.log({ user });
    try {
      const createdUser = await this.app.service('users').create(user);
      return createdUser;
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  async getEntityData(profile: OAuthProfile) {
    console.log('****** In Get Entity Data ******\n\n');

    return {
      test: 'La vaca lola',
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
