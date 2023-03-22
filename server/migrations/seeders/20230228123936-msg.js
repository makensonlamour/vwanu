const fs = require('fs');
const path = require('path');
const { QueryTypes } = require('sequelize');
const msgs = require('../data/msgs');

const query = fs.readFileSync(
  path.resolve(__dirname, '../queries', 'emailTemplateQuery.sql'),
  'utf8'
);
module.exports = {
  async up(queryInterface) {
    msgs.map((msg) =>
      queryInterface.sequelize.query(query, {
        replacements: [msg.subject, msg.body, msg.snug],
        type: QueryTypes.INSERT,
      })
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('EmailTemplates', null, {});
  },
};
