const { v4 } = require('uuid');
const config = require('config');
const { QueryTypes } = require('sequelize');

module.exports = {
  async up(queryInterface) {
    const env = config.util.getEnv('NODE_ENV');
    // select all cities in the database 
    const query = ` 
      SELECT name FROM "Cities" AS cities
      ${env === 'development' && 'LIMIT 10'}
      `;
      

    const defaultUserQuery = `SELECT id FROM "Users" WHERE email = '${config.get(
      'ROOT_USER_EMAIL'
    )}'`;

    const userId = (
      await queryInterface.sequelize.query(defaultUserQuery, {
        type: QueryTypes.SELECT,
        raw: true,
      })
    )[0];

    const cities = await queryInterface.sequelize.query(query, {
      type: QueryTypes.SELECT,
      raw: true,
    });

    const communities = cities.map((city) => ({
      id: v4(),
      UserId: userId.id,
      description: city.name,
      name: city.name,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    await queryInterface.bulkInsert('Communities', communities);
  },

  async down(queryInterface) {
    return queryInterface.bulkDelete('Communities', null, {});
  },
};
