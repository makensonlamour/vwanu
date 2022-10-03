// eslint-disable-next-line import/no-extraneous-dependencies
const { v4 } = require('uuid');
const countries = require('../data/counties');

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      'Countries',

      countries.map((country) => ({
        name: country.name,
        id: v4(),
        createdAt: new Date(),
        updatedAt: new Date(),
        initials: country.iso2,
      }))
    );
  },
  async down(queryInterface) {
    await queryInterface.bulkDelete('State', null, {});
  },
};
