/* eslint-disable import/no-extraneous-dependencies */

const fs = require('fs');
const path = require('path');
const { QueryTypes } = require('sequelize');
const { v4 } = require('uuid');

const addressTypes = [
  'Work',
  'Home',
  'Billing',
  'Shipping',
  'School',
  'Other',
];

const upsertAddressTypeQuery = fs.readFileSync(
  path.resolve(__dirname, '../queries', 'upsertAddressType.sql'),
  'utf-8'
);
module.exports = {
  async up(queryInterface) {
    // await queryInterface.bulkDelete('AddressTypes', null, {});
    await Promise.all(
      addressTypes.map((description) =>
        queryInterface.sequelize.query(upsertAddressTypeQuery, {
          replacements: [v4(), description],
          type: QueryTypes.SELECT,
        })
      )
    );
    // return queryInterface.bulkInsert('AddressTypes', addressTypes);
  },

  async down(queryInterface) {
    return queryInterface.bulkDelete('AddressTypes', null, {});
  },
};
