module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Cities', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },

      name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      StateId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'States',
          key: 'id',
        },
      },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('Cities');
  },
};
