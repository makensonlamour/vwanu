/* eslint-disable class-methods-use-this */
import axios from 'axios';
import { OAuthStrategy, OAuthProfile } from '@feathersjs/authentication-oauth';

// Local dependencies
import Logger from '../../lib/utils/logger';

const openidConnectUrl = 'https://openidconnect.googleapis.com/v1/userinfo';

export default class GoogleStrategy extends OAuthStrategy {
  async getRedirect(authResult) {
    const { accessToken } = authResult;
    if (!accessToken) throw new Error('No access token created');
    const frontendUrl = this.app.get('frontendUrl');
    const redirectURL = frontendUrl || `/?`;
    return `${redirectURL}?access_token=${authResult?.accessToken}`;
  }

  // eslint-disable-next-line class-methods-use-this
  async getProfile(authResult) {
    const accessToken = authResult?.access_token;
    const { data }: any = await axios
      .get(`${openidConnectUrl}?access_token=${accessToken}`)
      .then((res) => res)
      .catch((err) => {
        Logger.log(err);
      });
    return data;
  }

  // eslint-disable-next-line no-unused-vars
  async getEntityQuery(profile, params) {
    return {
      email: profile.email,
    };
  }

  // eslint-disable-next-line no-unused-vars
  async findEntity(profile, params) {
    try {
      const user = await this.app.get('sequelizeClient').models.User.findOne({
        where: { email: profile.email },
      });
      return user;
    } catch (err) {
      Logger.error(err);
      return null;
    }
  }

  // eslint-disable-next-line no-unused-vars
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

    try {
      const createdUser = await this.app.service('users').create(user);
      return createdUser;
    } catch (err) {
      Logger.error(err);
      return null;
    }
  }

  async getEntityData(profile: OAuthProfile) {
    return {
      isVerified: true,
      profilePicture: profile.picture,
      email: profile.email,
    };
  }
}
