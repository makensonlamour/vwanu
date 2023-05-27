const fs = require('fs');
const path = require('path');
const { QueryTypes } = require('sequelize');
const templates = require('../data/template');

const query = fs.readFileSync(
  path.resolve(__dirname, '../queries', 'template.sql'),
  'utf8'
);
module.exports = {
  async up(queryInterface) {
    templates.map((template) =>
      queryInterface.sequelize.query(query, {
        replacements: [template.id, template.snug, template.type],
        type: QueryTypes.INSERT,
      })
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('EmailTemplates', null, {});
  },
};
