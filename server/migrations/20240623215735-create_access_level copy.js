/* eslint-disable no-unused-vars */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('access_level_logs', {
      granted_to: {
        type: Sequelize.UUID,
        references: {
          key: 'id',
          model: 'Users',
        },
      },
      granted_by: {
        type: Sequelize.UUID,
        references: {
          key: 'id',
          model: 'Users',
        },
      },
      access_level: {
        type: Sequelize.UUID,
        references: {
          key: 'id',
          model: 'CommunityRoles',
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
    await queryInterface.dropTable('access_level_logs');
  },
};
