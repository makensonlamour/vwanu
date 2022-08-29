/* eslint-disable import/no-import-module-exports */

import { Model } from 'sequelize';

export interface AddressTypeInterface {
  id: number;
  description: string;
}
export default (sequelize: any, DataTypes: any) => {
  class AddressType
    extends Model<AddressTypeInterface>
    implements AddressTypeInterface
  {
    id: number;

    description: string;

    static associate(models: any): void {
      AddressType.hasMany(models.Address);
    }
  }
  AddressType.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },

      description: {
        type: DataTypes.ENUM(
          'Work',
          'Home',
          'Billing',
          'Shipping',
          'School',
          'Other'
        ),
        defaultValue: 'Home',
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
      modelName: 'AddressTypes',
    }
  );
  return AddressType;
};
