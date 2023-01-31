/* eslint-disable no-param-reassign */
import { Model } from 'sequelize';

// Customs dependencies:
import { CallInterface, CallStatus } from '../schema/call';

export default (sequelize: any, DataTypes: any) => {
  class Call extends Model<CallInterface> implements CallInterface {
    id: string;

    startTime: number;

    endTime: number;

    status: string;

    type: string;

    static associate(models: any): void {
      Call.belongsTo(models.User, { as: 'caller' });
      Call.belongsTo(models.User, { as: 'receiver' });
    }
  }
  Call.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
      },

      startTime: { type: DataTypes.DATE, allowNull: true },
      endTime: { type: DataTypes.DATE, allowNull: true },

      status: {
        type: DataTypes.STRING,
        defaultValue: 'initiated',
        allowNull: false,
        validate: {
          customValidator: (value) => {
            if (!CallStatus.includes(value)) {
              throw new Error(`${value} is not a valid option for call status`);
            }
          },
        },
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          customValidator: (value) => {
            if (!['video', 'audio'].includes(value)) {
              throw new Error(`${value} is not a valid option for call type`);
            }
          },
        },
      },
    },

    {
      hooks: {},
      sequelize,
      modelName: 'Call',
    }
  );
  return Call;
};
