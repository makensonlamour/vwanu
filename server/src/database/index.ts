/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */

import Sequelize from 'sequelize';

/** Local dependencies */
import { Application } from '../declarations';

/** Tables */
import post from './post';
import user from './user';
import blog from './blog';
import album from './album';
import Media from './media';
import Korem from './korem';
import friend from './Friends';
import service from './service';
import Visitors from './Visitors';
import interest from './interest';
import reaction from './reaction';
import community from './communities';
import discussion from './discussion';
import notification from './notification';
import BlogResponse from './blog-response';
import refreshToken from './refresh-token';
import emailTemplate from './emailTemplate';
import communityRoles from './community-roles';
import communityUsers from './community-users';
import communityInvitationRequest from './communityInvitationRequest';

const tables = [
  user,
  post,
  blog,
  album,
  Korem,
  Media,
  friend,
  service,
  interest,
  Visitors,
  reaction,
  community,
  discussion,
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
