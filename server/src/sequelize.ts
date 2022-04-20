/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */

import { Application } from './declarations';

const Sequelize = require('sequelize');
const config = require('config');

const dbSettings = config.get('dbSettings');

/* #region */
// const extension =
//   process.env.NODE_ENV === 'staging' || process.env.NODE_ENV === 'production'
//     ? '.js'
//     : '.ts';

// fs.readdirSync(__dirname)
//   .filter(
//     (file: string) =>
//       file.indexOf('.') !== 0 &&
//       file !== basename &&
//       file.slice(-3) === extension
//   )
//   .forEach((file: any) => {
//     const model = require(path.join(__dirname, file))(
//       sequelize,
//       Sequelize.DataTypes
//     );
//     db[model.name] = model;
//   });

// Object.keys(db).forEach((modelName) => {
//   if (db[modelName].associate) {
//     db[modelName].associate(db);
//   }
// });

// db.sequelize = sequelize;
// db.Sequelize = Sequelize;
/* #endregion */

export default function (app: Application): void {
  const sequelize = dbSettings.url
    ? new Sequelize(dbSettings.url)
    : new Sequelize(
        dbSettings.database,
        dbSettings.username,
        dbSettings.password,
        dbSettings
      );

  const oldSetup = app.setup;
  app.set('sequelizeClient', sequelize);

  // eslint-disable-next-line no-param-reassign
  app.setup = function (...args): Application {
    const result = oldSetup.apply(this, args);

    // Set up data relationships
    const { models } = sequelize;
    console.log('\n\n\\n Users \n\n\n\n\n');
    console.log(models);
    Object.keys(models).forEach((name) => {
      if ('associate' in models[name]) {
        (models[name] as any).associate(models);
      }
    });

    // Sync to the database
    return result;
  };
  app.set('sequelizeSync', sequelize.sync());
  
}
