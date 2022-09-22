/* eslint-disable no-path-concat */
// const Sequelize = require('sequelize');
// const app = require('../../src/app');
// const sequelizeConf = require('../../src/sequelize');
// const db = require('../../src/db');

// sequelizeConf(app);
// db(app);
// app.get('startSequelize')();

// const sequelize = "app.get('sequelizeClient')";
// const { models } = sequelize;

// // The export object must be a dictionary of model names -> models
// // It must also include sequelize (instance) and Sequelize (constructor) properties
// module.exports = {
//   Sequelize,
//   sequelize,
//   ...models,
// };

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

// eslint-disable-next-line import/no-dynamic-require, prefer-template
const config = require(__dirname + '/../config/config.js');
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

fs.readdirSync('../../src/db')
  // eslint-disable-next-line arrow-body-style
  .filter((file) => {
    return (
      file.indexOf('.') !== 0 &&
      !file.includes('index') &&
      file.slice(-3) === '.js'
    );
  })
  .forEach((file) => {
    // eslint-disable-next-line dot-notation
    const model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
