module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('CategoryInterests', {
      InterestId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Interest',
          key: 'id',
        },
      },

      ForumCategoryId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Forums',
          key: 'id',
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('CategoryInterests');
  },
};
