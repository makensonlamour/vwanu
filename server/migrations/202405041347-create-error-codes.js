/* eslint-disable no-unused-vars */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('error_codes', {
       error_code: {
        type: DataTypes.STRING,
        primaryKey: true,
        unique:true
      },

      error_message: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('error_codes');
  },
};
