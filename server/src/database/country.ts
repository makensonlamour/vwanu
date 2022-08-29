/* eslint-disable import/no-import-module-exports */

import { Model } from 'sequelize';

export interface CountryInterface {
  id: number;
  name: string;
  initials: string;
}
export default (sequelize: any, DataTypes: any) => {
  class Country extends Model<CountryInterface> implements CountryInterface {
    id: number;

    name: string;

    initials: string;

    static associate(models: any): void {
      Country.hasMany(models.State);
    }
  }
  Country.init(
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
      initials: {
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
      modelName: 'Country',
    }
  );
  return Country;
};
