const fs = require('fs');
const path = require('path');

const query = fs.readFileSync(
  path.resolve(__dirname, './queries', 'proc_remove_followers.sql'),
  'utf-8'
);
module.exports = {
  async up(queryInterface) {
    await queryInterface.sequelize.query(query);
  },
  async down(queryInterface) {
    await queryInterface.sequelize.query(
      'DROP PROCEDURE IF EXISTS proc_remove_follower'
    );
  },
};
