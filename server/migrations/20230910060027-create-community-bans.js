module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('community_bans', {
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

      by_user_id: {
        type: Sequelize.UUID,
        primaryKey: true,
        references: {
          model: 'Users',
          key: 'id',
        },
        allowNull: false,
      },

      comment: {
        type: Sequelize.TEXT,
        allowNull: true,
      },

      until: {
        type: Sequelize.DATE,
        allowNull: true,
      },

      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('community_bans');
  },
};
