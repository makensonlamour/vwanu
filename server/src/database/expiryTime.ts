/* eslint-disable import/no-import-module-exports */
import { Model } from 'sequelize';
import { ExpiryTimeInterface } from '../schema/expiryTime.schema';

export default (sequelize: any, DataTypes: any) => {
  class ExpiryTime extends Model<ExpiryTimeInterface> implements ExpiryTimeInterface {
    request_type: string
    expiry_duration_minutes :number
  }
  ExpiryTime.init(
    {
      request_type: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
        unique: false,
      },

      expiry_duration_minutes: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },

    {
     
      sequelize,
      modelName: 'ExpiryTimes',
      tableName:'expiry_times',
      timestamps:false,
      underscored:true
    }
  );
  return ExpiryTime;
};
