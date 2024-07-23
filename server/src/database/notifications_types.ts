
import { Model } from 'sequelize';
import { NotificationTypesInterface } from '../schema/notifications_types';

/**
 * Represents a notification setting in the database.
 */
export default (sequelize: any, DataTypes: any) => {
  class NotificationType
    extends Model<NotificationTypesInterface>
    implements NotificationTypesInterface {
    notification_slug: string;
    notification_name: string;
    notification_description: string;

  }

  NotificationType.init(
    {
      notification_slug: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      notification_name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      notification_description: {
        type: DataTypes.TEXT,
        unique: true,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'NotificationTypes',
      tableName: 'notification_types',
      timestamps: false,
      underscored: true,
    }
  );

  return NotificationType;
};
