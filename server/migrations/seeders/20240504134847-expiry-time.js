const fs = require('fs');
const expiryDates = require('../data/expiryTimes');

module.exports = {
  async up(queryInterface) {
    return queryInterface.bulkInsert(
      'expiry_times',
      expiryDates
    );
  },

  async down(queryInterface) {
    return queryInterface.bulkDelete('error_codes', null, {});
  },
};
