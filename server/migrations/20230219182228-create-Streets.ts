module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Streets', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },

      name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },

      type: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      zipCode: {
        type: Sequelize.STRING,
        allowNull: true,
      },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('EntityAddresses');
  },
};