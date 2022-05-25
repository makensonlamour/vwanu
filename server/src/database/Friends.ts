/* eslint-disable no-param-reassign */
/* eslint-disable import/no-import-module-exports */

import { Model } from 'sequelize';

export interface FriendInterface {
  id: string;
  RequesterId: string;
  UserId: string;
  accepted: boolean;
}
export default (sequelize: any, DataTypes: any) => {
  class Friend extends Model<FriendInterface> implements FriendInterface {
    id: string;

    RequesterId: string;

    UserId: string;

    accepted: boolean;

    static associate(models: any): void {
      Friend.hasOne(models.User, { as: 'Requester' });
      Friend.hasOne(models.User, { as: 'User' });
    }
  }
  Friend.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        // autoIncrement: true,
      },
      RequesterId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      UserId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      accepted: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
    },

    {
      sequelize,
      modelName: 'Friend',
    }
  );
  return Friend;
};
