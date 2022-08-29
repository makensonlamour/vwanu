/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */

import Sequelize from 'sequelize';

/** Local dependencies */
import { Application } from '../declarations';

/** Tables */

import post from './post';
import user from './user';
import city from './city';
import blog from './blog';
import album from './album';
import Media from './media';
import state from './state';
import Korem from './korem';
import street from './street';
import friend from './Friends';
import address from './address';
import country from './country';
import message from './message';
import service from './service';
import Visitors from './Visitors';
import interest from './interest';
import reaction from './reaction';
import community from './communities';
import discussion from './discussion';
import addressType from './addressTypes';
import userAddress from './userAddresses';
import conversation from './conversation';
import notification from './notification';
import BlogResponse from './blog-response';
import refreshToken from './refresh-token';
import emailTemplate from './emailTemplate';
import communityRoles from './community-roles';
import communityUsers from './community-users';
import communityInvitationRequest from './communityInvitationRequest';

const tables = [
  user,
  city,
  city,
  post,
  blog,
  album,
  state,
  Korem,
  Media,
  street,
  friend,
  address,
  message,
  country,
  service,
  interest,
  Visitors,
  reaction,
  community,
  discussion,
  addressType,
  userAddress,
  conversation,
  notification,
  BlogResponse,
  refreshToken,
  emailTemplate,
  communityUsers,
  communityRoles,
  communityInvitationRequest,
];

export default function (app: Application): void {
  const sequelize = app.get('sequelizeClient');

  tables.forEach((table) => {
    table(sequelize, Sequelize.DataTypes);
  });
}
