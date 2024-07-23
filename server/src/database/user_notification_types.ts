
import { Model } from 'sequelize';
import { UserNotificationTypesInterface } from '../schema/user_notifications_types';

/**
 * Represents a notification setting in the database.
 */
export default (sequelize: any, DataTypes: any) => {
  class UserNotificationType
    extends Model<UserNotificationTypesInterface>
    implements UserNotificationTypesInterface {
    user_id: string;
    notification_slug: string;
    text: boolean;
    email: boolean;
    sound: boolean;

  }

  UserNotificationType.init(
    {
      user_id: {
        type: DataTypes.UUID,
        // primaryKey: true,
        references: {
          model: 'Users',
          key: 'id'
        }
      },
      notification_slug: {
        type: DataTypes.STRING,
        // unique: true,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'notification_types',
          key: 'notification_slug'
        }
      },
      text: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      email: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      sound: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
      },
    },
    {
      sequelize,
      modelName: 'UserNotificationTypes',
      tableName: 'user_notification_types',
      timestamps: false,
      underscored: true,
    }
  );

  return UserNotificationType;
};
