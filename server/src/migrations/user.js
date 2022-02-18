
export default {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Users', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      hash: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      salt: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      activationKey: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      resetPasswordKey: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      verified: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
    }),
  down: (queryInterface) => queryInterface.dropTable('Users'),
}
