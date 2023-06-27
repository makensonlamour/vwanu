module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('User_Follower', {
      UserId: {
        type: Sequelize.UUID,
        foreignKey: true,
        references: {
          model: 'Users',
          key: 'id',
        },
        primaryKey: true,
      },
      FollowerId: {
        type: Sequelize.UUID,
        foreignKey: true,
        references: {
          model: 'Users',
          key: 'id',
        },
        primaryKey: true,
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
    await queryInterface.dropTable('User_Follower');
  },
};
