/* eslint-disable import/no-import-module-exports */

import { Model } from 'sequelize';

export interface EntityAddressInterface {
  id: number;
  dateAddressTo: Date;
  dateAddressFrom: Date;
}
export default (sequelize: any, DataTypes: any) => {
  class EntityAddress
    extends Model<EntityAddressInterface>
    implements EntityAddressInterface
  {
    id: number;

    dateAddressTo: Date;

    dateAddressFrom: Date;

    static associate(models: any): void {
      EntityAddress.belongsTo(models.User);
      EntityAddress.belongsTo(models.Address);
      EntityAddress.belongsTo(models.AddressTypes);
    }
  }
  EntityAddress.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      dateAddressTo: {
        type: DataTypes.UUID,
        allowNull: true,
      },
      dateAddressFrom: {
        type: DataTypes.DATE,
        defaultValue: Date.now(),
      },
    },

    {
      // hooks: {
      //   afterFind: (name, option) => {
      //     // console.log('\n\n\n Some thing ');
      //     // console.log({name, option});
      //   },
      // },
      sequelize,
      modelName: 'EntityAddress',
    }
  );
  return EntityAddress;
};
