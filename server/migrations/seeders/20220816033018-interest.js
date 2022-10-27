/* eslint-disable import/no-extraneous-dependencies */

const { v4 } = require('uuid');

const interestsList = [
  'Sports',
  'education',
  'Politics',
  'Music',
  'Movies',
  'Finance',
  'Technology',
  'Art',
];
const interests = interestsList?.map((name) => ({
  name,
  createdAt: new Date(),
  updatedAt: new Date(),
  accessible: true,
  id: v4(),
}));
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkDelete('Interests', null, {});
    return queryInterface.bulkInsert('Interests', interests);
  },

  async down(queryInterface) {
    return queryInterface.bulkDelete('Interests', null, {});
  },
};
