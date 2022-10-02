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
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
          customValidator: (value) => {
            if (
              ![
                'Work',
                'Home',
                'Billing',
                'Shipping',
                'School',
                'Other',
              ].includes(value)
            ) {
              throw new Error(`${value} is not a valid option for description`);
            }
          },
        },
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
