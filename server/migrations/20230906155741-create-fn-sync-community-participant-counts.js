const path = require('path');
const fs = require('fs');

const query = fs.readFileSync(
  path.resolve(
    __dirname,
    './queries',
    'fn_sync_community_participant_counts.sql'
  ),
  'utf-8'
);

module.exports = {
  async up(queryInterface) {
    await queryInterface.sequelize.query(query);
  },
  async down(queryInterface) {
    await queryInterface.sequelize.query(
      'DROP FUNCTION IF EXISTS fn_sync_community_participant_counts'
    );
  },
};
