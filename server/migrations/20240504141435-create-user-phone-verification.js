const { nanoid } = require('nanoid');

module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('user_phone_verifications', {
     user_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references:{
          model:'Users',
          key:'id'
        }
      },
      phone_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
          model:'phones',
          key:'id'
        }
      },
      verification_code: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue:nanoid(),
      },
      code_sent_time: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue:Date.now(),
      },
      verified_time: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      is_verified:{
        type:DataTypes.BOOLEAN,
        defaultValue:false,
        allowNull:false, 
      }

    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('phones');
  },
};
