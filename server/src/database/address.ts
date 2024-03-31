/* eslint-disable import/no-import-module-exports */

import { Model } from 'sequelize';

export interface AddressInterface {
  id: number;
}
export default (sequelize: any, DataTypes: any) => {
  class Address extends Model<AddressInterface> implements AddressInterface {
    id: number;

    static associate(models: any): void {
      Address.belongsTo(models.Street);
      Address.belongsTo(models.City);
      Address.belongsTo(models.State);
      Address.belongsTo(models.Country);
      Address.hasMany(models.EntityAddress);
    }
  }
  Address.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
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
      modelName: 'Address',
    }
  );
  return Address;
};
