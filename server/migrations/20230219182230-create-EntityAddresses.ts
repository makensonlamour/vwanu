module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('EntityAddresses', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      dateAddressTo: {
        type: Sequelize.UUID,
        allowNull: true,
      },
      dateAddressFrom: {
        type: Sequelize.DATE,
        defaultValue: Date.now(),
      },
      UserId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id',
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
        },
      },
      AddressId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Addresses',
          key: 'id',
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
        },
      },
      AddressTypeId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'AddressTypes',
          key: 'id',
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
        },
      },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('EntityAddresses');
  },
};