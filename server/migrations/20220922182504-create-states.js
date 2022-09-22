module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('State', {
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
      initials: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      areaCode: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },

      CountryId: {
        type: Sequelize.UUID,
        references: {
          model: 'Countries',
          key: 'id',
        },
      },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('State');
  },
};
