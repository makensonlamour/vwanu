module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('CommunityInvitationRequests', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
      },
      guest: {
        type: Sequelize.UUID,
        references: {
          model: 'Users',
          key: 'id',
        },
        allowNull: true,
      },

      host: {
        type: Sequelize.UUID,
        references: {
          model: 'Users',
          key: 'id',
        },
        allowNull: true,
      },

      email: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      response: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },

      responseDate: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      CommunityRolesId: {
        type: Sequelize.UUID,
        references: {
          model: 'CommunityRoles',
          key: 'id',
        },
        allowNull: false,
      },

      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('CommunityInvitationRequests');
  },
};
