/* eslint-disable import/no-import-module-exports */

import { Model } from 'sequelize';

export interface CommunityBanInterface {
  user_id: string;
  community_id: string;
  by_user_id: string;
  comment: string;
  until: Date;
}
export default (sequelize: any, DataTypes: any) => {
  class CommunityBan
    extends Model<CommunityBanInterface>
    implements CommunityBanInterface
  {
    user_id!: string;

    community_id!: string;

    by_user_id!: string;

    comment!: string;

    until!: Date;

    static associate(models: any): void {
      CommunityBan.belongsTo(models.User);
      CommunityBan.belongsTo(models.Community, {
        foreignKey: {
          allowNull: false,
        },
      });
      CommunityBan.belongsTo(models.CommunityRoles);
    }
  }
  CommunityBan.init(
    {
      user_id: {
        type: DataTypes.UUID,
        primaryKey: true,
        references: {
          model: 'Users',
          key: 'id',
        },
        allowNull: false,
      },

      community_id: {
        type: DataTypes.UUID,
        primaryKey: true,
        references: {
          model: 'Communities',
          key: 'id',
        },
        allowNull: false,
      },

      by_user_id: {
        type: DataTypes.UUID,
        primaryKey: true,
        references: {
          model: 'Users',
          key: 'id',
        },
        allowNull: false,
      },

      comment: {
        type: DataTypes.TEXT,
        allowNull: true,
      },

      until: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },

    {
      sequelize,
      modelName: 'CommunityBans',
      tableName: 'community_bans',
      underscored: true,
    }
  );
  return CommunityBan;
};
