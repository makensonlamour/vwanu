const path = require('path');
const fs = require('fs');

const query = fs.readFileSync(
  path.resolve(__dirname, './queries', 'fn_verify_and_update_access_level.sql'),
  'utf-8'
);

module.exports = {
  async up(queryInterface) {
    await queryInterface.sequelize.query(query);
  },
  async down(queryInterface) {
    await queryInterface.sequelize.query(
      'DROP FUNCTION IF EXISTS fn_verify_and_update_access_level'
    );
  },
};
