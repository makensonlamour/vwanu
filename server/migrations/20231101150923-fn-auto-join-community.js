const fs = require('fs');
const path = require('path');

const query = fs.readFileSync(
  path.resolve(__dirname, './queries', 'fn_auto_join_community.sql'),
  'utf-8'
);

module.exports = {
  async up(queryInterface) {
    await queryInterface.sequelize.query(query);
  },
  async down(queryInterface) {
    await queryInterface.sequelize.query(
      'DROP FUNCTION IF EXISTS fn_auto_join_community'
    );
  },
};
