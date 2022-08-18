/* eslint-disable import/no-extraneous-dependencies */

const { v4 } = require('uuid');

const interests = [
  'Sports',
  'education',
  'Politics',
  'Music',
  'Movies',
  'Finance',
  'Technology',
  'Art',
];
module.exports = {
  async up(queryInterface) {
    return queryInterface.bulkInsert(
      'Interests',
      interests.map((name) => ({
        name,
        createdAt: new Date(),
        updatedAt: new Date(),
        accessible: true,
        id: v4(),
      }))
    );
  },

  async down(queryInterface) {
    return queryInterface.bulkDelete('Interests', null, {});
  },
};
