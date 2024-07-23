/* eslint-disable import/no-import-module-exports */

import { Model } from 'sequelize';

export interface CommunityUsersInterface {
  CommunityId: string;
  UserId: string;
  CommunityRoleId: string;
}
export default (sequelize: any, DataTypes: any) => {
  class CommunityUsers
    extends Model<CommunityUsersInterface>
    implements CommunityUsersInterface
  {
    CommunityId: string;

    UserId: string;

    CommunityRoleId: string;

    static associate(models: any): void {
      CommunityUsers.belongsTo(models.User, {
        foreignKey: {
          allowNull: false,
        },
        constraints: true,
      });
      CommunityUsers.belongsTo(models.Community, {
        foreignKey: {
          allowNull: false,
        },
      });
      CommunityUsers.belongsTo(models.CommunityRoles, {
        foreignKey: {
          allowNull: false,
        },
      });
    }
  }
  CommunityUsers.init(
    {
      CommunityRoleId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'CommunityRoles',
          key: 'id',
        },
      },
      CommunityId: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'Communities',
          key: 'id',
        },
      },
      UserId: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'Users',
          key: 'id',
        },
      },
    },

    {
      sequelize,
      modelName: 'CommunityUsers',
      tableName: 'community_users',
      underscored: true,
      updatedAt: false,
    }
  );
  return CommunityUsers;
};
