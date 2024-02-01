
import { Model } from 'sequelize';

import { NotificationSettingsInterface } from '../schema/notifications_settings';

export default (sequelize: any, DataTypes: any) => {
  class NotificationSetting
    extends Model<NotificationSettingsInterface>
    implements NotificationSettingsInterface
  {
    id: number;
    notification_name: string;
    notification_description: string;

    static associate(models: any): void {
      NotificationSetting.belongsToMany(models.User, {
        through: 'user_notification_settings',
        foreignKey: 'notification_setting_id',
      });
    }
  }
  NotificationSetting.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      notification_name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      notification_description: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
    },

    {
      sequelize,
      modelName: 'NotificationSettings',
      tableName: 'notification_settings',
      timestamps: false,
      underscored: true,
    }
  );
  return NotificationSetting;
};
