const path = require('path');
const fs = require('fs');

const query = fs.readFileSync(
  path.resolve(
    __dirname,
    './queries',
    'fn_join_community_invitation_update.sql'
  ),
  'utf-8'
);

module.exports = {
  async up(queryInterface) {
    await queryInterface.sequelize.query(query);
  },
  async down(queryInterface) {
    await queryInterface.sequelize.query(
      'DROP PROCEDURE IF EXISTS fn_join_community_invitation_update'
    );
  },
};
