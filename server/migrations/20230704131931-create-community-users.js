module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('CommunityUsers', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      CommunityRoleId: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
        references: {
          model: 'CommunityRoles',
          key: 'id',
        },
      },
      CommunityId: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
        references: {
          model: 'Communities',
          key: 'id',
        },
      },
      UserId: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id',
        },
      },

      banned: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      bannedDate: {
        type: Sequelize.DATE,
        allowNull: true,
      },

      untilDate: {
        type: Sequelize.DATE,
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
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('CommunityUsers');
  },
};
