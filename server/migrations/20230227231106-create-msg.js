module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('EmailTemplates', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      subject: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      body: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      snug: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: true,
      },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('EmailTemplates');
  }
};