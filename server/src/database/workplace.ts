/* eslint-disable no-param-reassign */
/* eslint-disable import/no-import-module-exports */

import { Model } from 'sequelize';

export interface WorkPlaceInterface {
  id: string;
  name: string;
}
export default (sequelize: any, DataTypes: any) => {
  class WorkPlace
    extends Model<WorkPlaceInterface>
    implements WorkPlaceInterface
  {
    id: string;

    name: string;

    static associate(models: any): void {
      WorkPlace.hasMany(models.UserWorkPlace, {
        foreignKey: {
          name: 'WorkPlaceId',
          allowNull: false,
        },
      });
    }
  }
  WorkPlace.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    },

    {
      sequelize,
      modelName: 'WorkPlace',
    }
  );
  return WorkPlace;
};
