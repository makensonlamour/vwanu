module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('user_notification_types', {
      user_id: {
        type: DataTypes.UUID,
        primaryKey: true,
        reference: {
          model: 'Users',
          key: 'id',
        },
      },
      notification_slug: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
        reference: {
          model: 'notification_types',
          key: 'notification_slug',
        },
      },
      text: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      email: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      sound: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('user_notification_types');
  },
};
