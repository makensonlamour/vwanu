const { v4 } = require('uuid');
const { QueryTypes } = require('sequelize');

module.exports = {
  async up(queryInterface) {
    // select all cities in the database where the country is 'USA'
    const query = `
      SELECT name FROM cities 
      INNER JOIN countries on cities.country_id = countries.id
      WHERE countries.name = 'haiti'
      `;

    await Promise.all(
      queryInterface.sequelize
        .query(query, { type: QueryTypes.SELECT, raw: true })
        .then((cities) => {
          // for each city, create a community
          cities.forEach((city) => {
            queryInterface.sequelize.query(
              'INSERT INTO communities (id, name, createdAt, updatedAt) VALUES (?, ?, ?, ?)',
              {
                replacements: [v4(), city.name, new Date(), new Date()],
                type: QueryTypes.INSERT,
              }
            );
          });
        })
    );
  },

  async down(queryInterface) {
    return queryInterface.bulkDelete('Users', null, {});
  },
};
