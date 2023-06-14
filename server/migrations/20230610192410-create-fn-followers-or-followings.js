const fs = require('fs');
const path = require('path');

const query = fs.readFileSync(
  path.resolve(__dirname, './queries', 'fn_get_followers_followings.sql'),
  'utf-8'
);
module.exports = {
  async up(queryInterface) {
    await queryInterface.sequelize.query(query);
  },
  async down(queryInterface) {
    await queryInterface.sequelize.query(
      'DROP FUNCTION IF EXISTS get_followers_or_following();'
    );
  },
};
