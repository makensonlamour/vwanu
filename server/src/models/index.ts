/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const config = require('config');

const basename = path.basename(__filename);
const dbSettings = config.get('dbSettings');
const db: any = {};

const sequelize = dbSettings.url
  ? new Sequelize(dbSettings.url)
  : new Sequelize(
      dbSettings.database,
      dbSettings.username,
      dbSettings.password,
      dbSettings
    );

const extension =
  process.env.NODE_ENV === 'staging' || process.env.NODE_ENV === 'production'
    ? '.js'
    : '.ts';

fs.readdirSync(__dirname)
  .filter(
    (file: string) =>
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === extension
  )
  .forEach((file: any) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
