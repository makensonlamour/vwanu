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
import friend from './Friends';
import reaction from './reaction';
import Visitors from './Visitors';
import interest from './interest';
import notification from './notification';
import refreshToken from './refresh-token';
import emailTemplate from './emailTemplate';

const tables = [
  user,
  post,
  blog,
  album,
  Media,
  friend,
  interest,
  Visitors,
  reaction,
  notification,
  refreshToken,
  emailTemplate,
];

export default function (app: Application): void {
  const sequelize = app.get('sequelizeClient');

  tables.forEach((table) => {
    table(sequelize, Sequelize.DataTypes);
  });
}
