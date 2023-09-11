module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('community_history', {
      user_id: {
        type: Sequelize.UUID,
        primaryKey: true,
        references: {
          model: 'Users',
          key: 'id',
        },
        allowNull: false,
      },

      community_id: {
        type: Sequelize.UUID,
        primaryKey: true,
        references: {
          model: 'Communities',
          key: 'id',
        },
        allowNull: false,
      },

      joined: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },

      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('community_history');
  },
};
