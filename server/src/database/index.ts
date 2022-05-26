/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */

import Sequelize from 'sequelize';

/** Local dependencies */
import { Application } from '../declarations';

/** Tables */
import post from './post';
import reaction from './reaction';
import user from './user';
import emailTemplate from './emailTemplate';
import refreshToken from './refresh-token';
import Media from './media';
import Visitors from './Visitors';
import friend from './Friends';
import blog from './blog';
import album from './album';
import notification from './notification';

const tables = [
  user,
  post,
  reaction,
  emailTemplate,
  refreshToken,
  Media,
  Visitors,
  friend,
  blog,
  album,
  notification,
];

export default function (app: Application): void {
  const sequelize = app.get('sequelizeClient');

  tables.forEach((table) => {
    table(sequelize, Sequelize.DataTypes);
  });
}
