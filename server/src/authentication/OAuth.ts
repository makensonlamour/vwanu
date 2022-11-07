/* eslint-disable class-methods-use-this */
/* eslint-disable max-classes-per-file */
/* eslint-disable no-unused-vars */
import axios from 'axios';
import { OAuthStrategy, OAuthProfile } from '@feathersjs/authentication-oauth';
// Local dependencies
import Logger from '../lib/utils/logger';

export default class GoogleStrategy extends OAuthStrategy {
  getProfileLink: string;

  constructor(options: { getProfileLink: string }) {
    super();
    this.getProfileLink = options.getProfileLink;
  }

  async getRedirect(authResult) {
    const fontEndUrl = this.app.get('frontendUrl');
    if (!fontEndUrl) throw new Error('No server address found');
    return `${fontEndUrl}?access_token=${authResult.accessToken}`;
  }

  // https://openidconnect.googleapis.com/v1/userinfo
  
  // eslint-disable-next-line class-methods-use-this
  async getProfile(authResult) {
    const accessToken = authResult?.access_token;
    const { data }: any = await axios
      .get(`${this.getProfileLink}?access_token=${accessToken}`)
      .then((res) => res)
      .catch((err) => {});
    return data;
  }

  async getEntityQuery(profile, params) {
    return {
      email: profile.email,
    };
  }

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
