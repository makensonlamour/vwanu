module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Templates', {
      id: {
        type: Sequelize.STRING,
        primaryKey: true,
        unique: true,
        allowNull: false,
      },

      snug: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('Templates');
  },
};
