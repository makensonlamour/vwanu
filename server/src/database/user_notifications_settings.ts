import { Model } from 'sequelize';

import { UserNotificationSettingsInterface } from '../schema/user_notifications_settings';

export default (sequelize: any, DataTypes: any) => {
  class UserNotificationSetting
    extends Model<UserNotificationSettingsInterface>
    implements UserNotificationSettingsInterface
  {
    user_id: number;
    notification_setting_id: number;
    notification_status: string;

    static associate(models: any): void {
      // UserNotificationSetting.hasOne(models.User, {
      //   foreignKey: 'user_id',
      // });
      // UserNotificationSetting.hasOne(models.NotificationSettings, {
      //   foreignKey: 'notification_setting_id',
      // });
    }
  }
  UserNotificationSetting.init(
    {
      user_id: {
        type: DataTypes.UUID,
        primaryKey: true,
      },
      notification_setting_id: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      notification_status: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
    },

    {
      sequelize,
      modelName: 'UserNotificationSettings',
      tableName: 'user_notification_settings',
      timestamps: false,
      underscored: true,
    }
  );
  return UserNotificationSetting;
};
