/* eslint-disable import/no-import-module-exports */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      'Addresses',
      {
        id: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          allowNull: false,
          primaryKey: true,
        },
        CityId: {
          type: Sequelize.UUID,
          allowNull: false,
          references: {
            model: 'Cities',
            key: 'id',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        },
        StateId: {
          type: Sequelize.UUID,
          allowNull: false,
          references: {
            model: 'States',
            key: 'id',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        },
        CountryId: {
          type: Sequelize.UUID,
          allowNull: false,
          references: {
            model: 'Countries',
            key: 'id',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        },
        // StreetId: {
        //   type: Sequelize.UUID,
        //   allowNull: false,
        //   references: {
        //     model: 'Streets',
        //     key: 'id',
        //     onDelete: 'CASCADE',
        //     onUpdate: 'CASCADE',
        //   },
        // },
        // AddressTypeId: {
        //   type: Sequelize.UUID,
        //   allowNull: false,
        //   references: {
        //     model: 'AddressTypes',
        //     key: 'id',
        //     onDelete: 'CASCADE',
        //     onUpdate: 'CASCADE',
        //   },
        // },
      }
    );
  },
  async down(queryInterface) {
    await queryInterface.dropTable('Addresses');
  },
};
