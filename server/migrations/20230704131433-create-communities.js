module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Communities', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
      },
      UserId: {
        type: Sequelize.UUID,
        allowNull: false,
      }, 
      numMembers: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      numAdmins: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        // @ts-ignore
        level: 'A',
      },

      privacyType: {
        type: Sequelize.STRING,
        defaultValue: 'public',
        allowNull: false,
        // @ts-ignore
        level: 'C',
      },
      coverPicture: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      description: {
        type: Sequelize.TEXT,
        allowNull: false,
        unique: true,
        // @ts-ignore
        level: 'B',
      },
      profilePicture: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      canInvite: {
        type: Sequelize.STRING,
        defaultValue: 'E',
        allowNull: true,
      },

      canInPost: {
        type: Sequelize.STRING,
        defaultValue: 'E',
        allowNull: true,
      },
      canInUploadPhotos: {
        type: Sequelize.STRING,
        defaultValue: 'E',
        allowNull: true,
      },

      canInUploadDoc: {
        type: Sequelize.STRING,
        defaultValue: 'E',
        allowNull: true,
      },

      canInUploadVideo: {
        type: Sequelize.STRING,
        defaultValue: 'E',
        allowNull: true,
      },

      canMessageInGroup: {
        type: Sequelize.STRING,
        defaultValue: 'E',
        allowNull: true,
      },
      defaultInvitationEmail: {
        type: Sequelize.TEXT,
        allowNull: true,
      },

      haveDiscussionForum: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      search_vector: {
        type: Sequelize.TSVECTOR,
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
  async down(queryInterface) {
    await queryInterface.dropTable('Communities');
  },
};
