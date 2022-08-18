module.exports = async function (globalConfig, projectConfig) {
  //await globalThis.__SEQUELIZE__.sync({ });
  await globalThis.__SEQUELIZE__.close();
};
