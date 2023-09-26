module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('CommunityUsers', {
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
        onDelete: 'CASCADE',
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

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('CommunityUsers');
  },
};
