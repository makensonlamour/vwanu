module.exports = {
  async up(queryInterface, Sequelize) {
    await Promise.all([
      queryInterface.addColumn('Users', 'phone', {
        type: Sequelize.STRING,
        allowNull: true,
      }),
      queryInterface.addColumn('Users', 'amountOfFollower', {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      }),
      queryInterface.addColumn('Users', 'amountOfFollowing', {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 0,
      }),
      queryInterface.addColumn('Users', 'amountOfFriend', {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 0,
      }),
    ]);
  },
  async down(queryInterface) {
    return Promise.all([
      queryInterface.removeColumn('Users', 'phone'),
      queryInterface.removeColumn('Users', 'amountOfFriend'),
      queryInterface.removeColumn('Users', 'amountOfFollower'),
      queryInterface.removeColumn('Users', 'amountOfFollowing'),
    ]);
  },
};
