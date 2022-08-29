/* eslint-disable import/no-import-module-exports */

import { Model } from 'sequelize';

export interface StateInterface {
  id: number;
  name: string;
  areaCode: string;
  initials: string;
}
export default (sequelize: any, DataTypes: any) => {
  class State extends Model<StateInterface> implements StateInterface {
    id: number;

    name: string;

    initials: string;

    areaCode: string;

    static associate(models: any): void {
      State.hasMany(models.City);
      State.belongsTo(models.Country, {
        foreignKey: { allowNull: false },
      });
    }
  }
  State.init(
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
      areaCode: {
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
      modelName: 'State',
    }
  );
  return State;
};
