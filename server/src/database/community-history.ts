/* eslint-disable import/no-import-module-exports */

import { Model } from 'sequelize';

export interface CommunityHistoryInterface {
  user_id: string;
  community_id: string;
  joined: boolean;
}
export default (sequelize: any, DataTypes: any) => {
  class CommunityHistory
    extends Model<CommunityHistoryInterface>
    implements CommunityHistoryInterface
  {
    user_id!: string;

    community_id!: string;

    joined!: boolean;

    static associate(models: any): void {
      CommunityHistory.belongsTo(models.User);
      CommunityHistory.belongsTo(models.Community, {
        // foreignKey: {
        //   allowNull: false,
        //   key: 'community_id',
        // },
      });
      CommunityHistory.belongsTo(models.CommunityRoles);
    }
  }
  CommunityHistory.init(
    {
      user_id: {
        type: DataTypes.UUID,
        references: {
          model: 'Users',
          key: 'id',
        },
        allowNull: false,
      },

      community_id: {
        type: DataTypes.UUID,
        references: {
          model: 'Communities',
          key: 'id',
        },
        allowNull: false,
      },

      joined: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
    },

    {
      sequelize,
      modelName: 'CommunityHistory',
      tableName: 'community_history',
      underscored: true,
      updatedAt: false,
    }
  );
  return CommunityHistory;
};
