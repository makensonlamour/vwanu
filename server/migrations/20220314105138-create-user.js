/* eslint-disable no-unused-vars */
const { nanoid } = require('nanoid');

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      lastName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      firstName: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      gender: {
        type: Sequelize.STRING,
        defaultValue: 'm',
      },

      about: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      language: {
        type: Sequelize.STRING,
        defaultValue: 'en',
      },
      activationKey: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: () => nanoid(),
      },
      resetPasswordKey: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      verified: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },

      lastSeenPrivacy: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },

      admin: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },

      cover: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      website: {
        type: Sequelize.STRING,
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  },
};
