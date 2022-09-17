/* eslint-disable import/no-import-module-exports */

import { Model } from 'sequelize';

export interface CommunityUsersInterface {
  id: string;
  banned: boolean;
  bannedDate: Date;
  untilDate: Date;
}
export default (sequelize: any, DataTypes: any) => {
  class CommunityUsers
    extends Model<CommunityUsersInterface>
    implements CommunityUsersInterface
  {
    id: string;

    banned: boolean;

    bannedDate: Date;

    untilDate: Date;

    static associate(models: any): void {
      CommunityUsers.belongsTo(models.User);
      CommunityUsers.belongsTo(models.Community, {
        foreignKey: {
          allowNull: false,
        },
      });
      CommunityUsers.belongsTo(models.CommunityRoles);
    }
  }
  CommunityUsers.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
      },

      banned: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      bannedDate: {
        type: DataTypes.DATE,
        allowNull: true,
      },

      untilDate: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },

    {
      sequelize,
      modelName: 'CommunityUsers',
    }
  );
  return CommunityUsers;
};
