/* eslint-disable import/no-extraneous-dependencies */
const { v4 } = require('uuid');
const countryList = require('../data/counties');

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      'Countries',
      countryList.map((country) => ({
        name: country.name,
        initials: country.iso2,
        id: v4(),
        createdAt: new Date(),
        updatedAt: new Date(),
      }))
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Countries', null, {});
  },
};
