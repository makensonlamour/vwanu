const path = require('path');
const fs = require('fs');

const query = fs.readFileSync(
  path.resolve(__dirname, './queries', 'fn_get_community.sql'),
  'utf-8'
);

module.exports = {
  async up(queryInterface) {
    await queryInterface.sequelize.query(query);
  },
  async down(queryInterface) {
    await queryInterface.sequelize.query(
      'DROP FUNCTION IF EXISTS proc_insert_community_ban'
    );
  },
};
