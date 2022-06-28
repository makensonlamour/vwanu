/* eslint-disable import/no-import-module-exports */

import { Model } from 'sequelize';

export interface CommunityUsersInterface {
  id: string;
  canPost: boolean;
  canInvite: boolean;
  canUploadDoc: boolean;
  canUploadVideo: boolean;
  canUploadPhoto: boolean;
  canMessageInGroup: boolean;
  banned: boolean;
  bannedDate: Date;
}
export default (sequelize: any, DataTypes: any) => {
  class CommunityUsers
    extends Model<CommunityUsersInterface>
    implements CommunityUsersInterface
  {
    id: string;

    canPost: boolean;

    canInvite: boolean;

    canUploadDoc: boolean;

    canUploadVideo: boolean;

    canUploadPhoto: boolean;

    canMessageInGroup: boolean;

    banned: boolean;

    bannedDate: Date;

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
      canPost: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      canInvite: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      canUploadDoc: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      canUploadVideo: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      canUploadPhoto: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      canMessageInGroup: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      banned: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      bannedDate: {
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
