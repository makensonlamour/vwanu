const fs = require('fs');
const path = require('path');


const query = fs.readFileSync(
  path.resolve(__dirname, '../queries', 'upsertAppUsers.sql'),
  'utf-8'
);

const errorCodes = require('../data/errorCodes');


module.exports = {
  async up(queryInterface) {
    return queryInterface.bulkInsert(
      'error_codes',
      errorCodes
    );
  },

  async down(queryInterface) {
    return queryInterface.bulkDelete('error_codes', null, {});
  },
};
