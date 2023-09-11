const path = require('path');
const fs = require('fs');

let query = fs.readFileSync(
  path.resolve(__dirname, './queries', 'rule_insert_community_history.sql'),
  'utf-8'
);

query = 'SELECT * FROM "Communities";';
module.exports = {
  async up(queryInterface) {
    await queryInterface.sequelize.query(query);
  },
  async down(queryInterface) {
    await queryInterface.sequelize.query(
      'GRANT INSERT ON CommunityHistory TO *;'
    );
  },
};
