import app from '../src/app';

export default async function (globalConfig, projectConfig) {
  const sequelize = app.get('sequelizeClient');
  // await sequelize.sync();
  console.log('Sequelize synced!');

  globalThis.__SEQUELIZE__ = sequelize;
}
