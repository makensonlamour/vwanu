module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('phones', {
       id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement:true,
        allowNull: false,
      },
      phone_number: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      // phone_type: {
      //   type: DataTypes.STRING,
      //   allowNull: true,
      //   references:{
      //     model:'address-types',
      //     key: 'id',
      //   }
      // },
      country_code: {
        type: DataTypes.UUID,
        allowNull: false,
        references:{
          model:'Countries',
          key:'id'
        }
      },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('phones');
  },
};
