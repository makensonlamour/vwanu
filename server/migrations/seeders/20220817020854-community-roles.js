/* eslint-disable camelcase */
/* eslint-disable import/no-extraneous-dependencies */
const { v4 } = require('uuid');

const roles = [
  { name: 'admin', role_access_level: 0 },
  { name: 'moderator', role_access_level: 1 },
  { role_access_level: 2, name: 'member' },
];
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkDelete('CommunityRoles', null, {});
    return queryInterface.bulkInsert(
      'CommunityRoles',
      roles.map(({ name, role_access_level }) => ({
        name,
        role_access_level,
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
