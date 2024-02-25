module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      notification_name: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
      },
      notification_description: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
      },
    });
  },
};
