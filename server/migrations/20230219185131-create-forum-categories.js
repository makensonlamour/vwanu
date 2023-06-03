module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ForumCategories', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
      },
      coverPicture: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      description: {
        type: Sequelize.TEXT,
        allowNull: true,
        // @ts-ignore
        level: 'C',
      },
      name: {
        type: Sequelize.TEXT,
        allowNull: false,
        // @ts-ignore
        level: 'A',
        unique: true,
      },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },

      search_vector: {
        type: Sequelize.TSVECTOR,
        allowNull: true,
      },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('ForumCategories');
  },
};
