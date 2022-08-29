/* eslint-disable import/no-import-module-exports */

import { Model } from 'sequelize';

export interface StreetInterface {
  id: number;
  name: string;
  zipCode: string;
  type: string;
}
export default (sequelize: any, DataTypes: any) => {
  class Street extends Model<StreetInterface> implements StreetInterface {
    id: number;

    name: string;

    initials: string;

    zipCode: string;

    type: string;

    static associate(models: any): void {
      Street.belongsTo(models.City);
    }
  }
  Street.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },

      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },

      type: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      zipCode: {
        type: DataTypes.STRING,
        allowNull: true,
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
      modelName: 'Street',
    }
  );
  return Street;
};
