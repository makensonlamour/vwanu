/* eslint-disable import/no-import-module-exports */
import { Id } from '@feathersjs/feathers';
import { Model } from 'sequelize';

export interface CommunityUsersInterface {
  UserId: Id;
  CommunityId: Id;
  CommunityRoleId: Id;
}
export default (sequelize: any, DataTypes: any) => {
  class CommunityUsers
    extends Model<CommunityUsersInterface>
    implements CommunityUsersInterface
  {
    UserId: Id;
    CommunityId: Id;
    CommunityRoleId: Id;

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
    },

    {
      sequelize,
      modelName: 'CommunityUsers',
      updatedAt: false,
    }
  );
  return CommunityUsers;
};
