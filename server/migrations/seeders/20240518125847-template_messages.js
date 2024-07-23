const fs = require('fs');
const templateMessages = require('../data/templateMessages');

module.exports = {
  async up(queryInterface) {
    return queryInterface.bulkInsert('template_messages', templateMessages);
  },

  async down(queryInterface) {
    return queryInterface.bulkDelete('template_messages', null, {});
  },
};
