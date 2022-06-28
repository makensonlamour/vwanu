/* eslint-disable import/no-import-module-exports */

import { Model } from 'sequelize';

export interface CommunityInvitationRequestInterface {
  id: string;

  email: string;

  response: boolean; //

  responseDate: Date;
}
export default (sequelize: any, DataTypes: any) => {
  class CommunityInvitationRequest
    extends Model<CommunityInvitationRequestInterface>
    implements CommunityInvitationRequestInterface
  {
    id: string;

    email: string;

    response: boolean;

    responseDate: Date;

    static associate(models: any): void {
      CommunityInvitationRequest.belongsTo(models.User, {
        as: 'guest',
      });

      CommunityInvitationRequest.belongsTo(models.User, {
        as: 'host',
      });

      CommunityInvitationRequest.belongsTo(models.Community, {
        foreignKey: {
          allowNull: false,
        },
      });
      CommunityInvitationRequest.belongsTo(models.CommunityRoles, {
        foreignKey: {
          allowNull: false,
        },
      });
    }
  }
  CommunityInvitationRequest.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
      },

      email: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      response: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      responseDate: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },

    {
      sequelize,
      modelName: 'CommunityInvitationRequest',
    }
  );
  return CommunityInvitationRequest;
};
