module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('notification_types', {
      notification_slug: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      notification_name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      notification_description: {
        type: DataTypes.TEXT,
        unique: true,
        allowNull: false,
      },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('notification_types');
  },
};
