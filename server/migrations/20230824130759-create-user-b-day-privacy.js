module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.addColumn('Users', 'birthdayPrivacy', {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    });
  },
  async down(queryInterface) {
    return queryInterface.removeColumn('Users', 'birthdayPrivacy');
  },
};
