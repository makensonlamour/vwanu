/* eslint-disable import/no-import-module-exports */

import { Model } from 'sequelize';

export interface CommunityUsersInterface {
  id: string;
  banned: boolean;
  bannedDate: Date;
  untilDate: Date;
  CommunityId: string;
  UserId: string;
  CommunityRoleId: string;
}
export default (sequelize: any, DataTypes: any) => {
  class CommunityUsers
    extends Model<CommunityUsersInterface>
    implements CommunityUsersInterface
  {
    id: string;

    CommunityId: string;

    UserId: string;

    CommunityRoleId: string;

    banned: boolean;

    bannedDate: Date;

    untilDate: Date;

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
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      CommunityRoleId: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        references: {
          model: 'CommunityRoles',
          key: 'id',
        },
      },
      CommunityId: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        references: {
          model: 'Communities',
          key: 'id',
        },
      },
      UserId: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id',
        },
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
