module.exports = async function (globalConfig, projectConfig) {
  console.log('Disconnecting Database ...');
  //await globalThis.__SEQUELIZE__.sync({ force: true });
  await globalThis.__SEQUELIZE__.close();
};
