/* eslint-disable import/no-import-module-exports */

import { Model } from 'sequelize';

export interface CityInterface {
  id: number;
  name: string;
}
export default (sequelize: any, DataTypes: any) => {
  class City extends Model<CityInterface> implements CityInterface {
    id: number;

    name: string;

    static associate(models: any): void {
      City.hasMany(models.Street);
      City.belongsTo(models.State);
    }
  }
  City.init(
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
        unique: false,
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
      modelName: 'City',
    }
  );
  return City;
};
