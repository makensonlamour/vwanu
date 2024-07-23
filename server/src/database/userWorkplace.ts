/* eslint-disable no-param-reassign */
/* eslint-disable import/no-import-module-exports */

import { Model } from 'sequelize';

export interface UserWorkPlaceInterface {
  description: string;
  from: Date;
  to: Date;
}
export default (sequelize: any, DataTypes: any) => {
  class UserWorkPlace
    extends Model<UserWorkPlaceInterface>
    implements UserWorkPlaceInterface
  {
    description: string;

    from: Date;

    to: Date;

    static associate(models: any): void {
      UserWorkPlace.belongsTo(models.User, {
        foreignKey: {
          name: 'UserId',
          allowNull: false,
        },
      });

      UserWorkPlace.belongsTo(models.WorkPlace, {
        foreignKey: {
          name: 'WorkPlaceId',
          allowNull: false,
        },
      });
    }
  }
  UserWorkPlace.init(
    {
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },

      from: {
        type: DataTypes.TEXT,
        allowNull: true,
      },

      to: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },

    {
      sequelize,
      modelName: 'UserWorkPlace',
    }
  );
  return UserWorkPlace;
};
