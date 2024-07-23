/* eslint-disable import/no-import-module-exports */

import { Model } from 'sequelize';

export interface AuthorizationInterface {
  granted_to: string;
  granted_by: string;
  access_level: string;
}
export default (sequelize: any, DataTypes: any) => {
  class Authorization extends Model<AuthorizationInterface> implements AuthorizationInterface {

    granted_to: string;
    granted_by: string;
    access_level: string;

  }
  Authorization.init(
    {
      granted_to: {
        type: DataTypes.UUID,
        references: {
          key: 'id',
          model: 'Users'
        }
      },
      granted_by: {
        type: DataTypes.UUID,
        references: {
          key: 'id',
          model: 'Users'
        }
      },
      access_level: {
        type: DataTypes.UUID,
        references: {
          key: 'id',
          model: 'CommunityRoles'
        }
      },


    },

    {
      sequelize,
      modelName: 'AccessLevelLogs',
      tableName: 'access_level_logs',
    }
  );
  return Authorization;
};
