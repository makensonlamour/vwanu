const notificationTypesData = require('../data/notification_types');

module.exports = {
  async up(queryInterface) {
    return queryInterface.bulkInsert(
      'notification_types',
      notificationTypesData
    );
  },
  async down(queryInterface) {
    await queryInterface.bulkDelete('notification_settings', null, {});
  },
};
