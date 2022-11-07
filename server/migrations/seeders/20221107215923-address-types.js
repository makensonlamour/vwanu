/* eslint-disable import/no-extraneous-dependencies */

const { v4 } = require('uuid');

const addresTypeList = [
  'Work',
  'Home',
  'Billing',
  'Shipping',
  'School',
  'Other',
];
const addressTypes = addresTypeList?.map((description) => ({
  description,
  createdAt: new Date(),
  updatedAt: new Date(),
  id: v4(),
}));

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkDelete('AddressTypes', null, {});
    return queryInterface.bulkInsert('AddressTypes', addressTypes);
  },

  async down(queryInterface) {
    return queryInterface.bulkDelete('AddressTypes', null, {});
  },
};
