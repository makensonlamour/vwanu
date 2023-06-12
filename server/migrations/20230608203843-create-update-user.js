module.exports = {
  async up(queryInterface, Sequelize) {
    await Promise.all([
      queryInterface.addColumn('Users', 'phone', {
        type: Sequelize.STRING,
        allowNull: true,
      }),
      queryInterface.addColumn('Users', 'followers_amount', {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      }),
      queryInterface.addColumn('Users', 'followings_amount', {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 0,
      }),
      queryInterface.addColumn('Users', 'friends_amount', {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 0,
      }),
    ]);
  },
  async down(queryInterface) {
    return Promise.all([
      queryInterface.removeColumn('Users', 'phone'),
      queryInterface.removeColumn('Users', 'friends_amount'),
      queryInterface.removeColumn('Users', 'followers_amount'),
      queryInterface.removeColumn('Users', 'followings_amount'),
    ]);
  },
};
