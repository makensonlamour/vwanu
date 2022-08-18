/* eslint-disable import/no-extraneous-dependencies */
const { v4 } = require('uuid');

const roles = ['admin', 'moderator', 'member'];
module.exports = {
  async up(queryInterface) {
    return queryInterface.bulkInsert(
      'CommunityRoles',
      roles.map((role) => ({
        name: role,
        id: v4(),
        createdAt: new Date(),
        updatedAt: new Date(),
      }))
    );
  },

  async down(queryInterface) {
    return queryInterface.bulkDelete('CommunityRoles', null, {});
  },
};
