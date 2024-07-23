module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('expiry_times', {
      request_type: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
        unique: false,
      },
      expiry_duration_minutes: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('expiry_times');
  },
};

//'Account Activation', 'Phone Verification', 'Email Verification'
