/* eslint-disable no-param-reassign */
/* eslint-disable import/no-import-module-exports */

import { Model } from 'sequelize';

export interface RefreshTokenInterface {
  id: number;

  userId: string;

  refreshToken: string;

  isValid: boolean;

  deviceId?: string;
}
export default (sequelize: any, DataTypes: any) => {
  class RefreshToken
    extends Model<RefreshTokenInterface>
    implements RefreshTokenInterface
  {
    id: number;

    userId: string;

    refreshToken: string;

    isValid: boolean;

    deviceId?: string;

    // eslint-disable-next-line no-unused-vars
    static associate(models: any): void {}
  }
  RefreshToken.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      userId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      refreshToken: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      deviceId: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      isValid: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
    },

    {
      sequelize,
      modelName: 'RefreshToken',
    }
  );
  return RefreshToken;
};
