/* eslint-disable import/no-import-module-exports */

import { Model } from 'sequelize';

export interface NotificationInterface {
  id: number;
  to: number;
  message: string;
  type: string;
  view: boolean;
  entityName: string;
  entityId: number;
}
export default (sequelize: any, DataTypes: any) => {
  class Notification
    extends Model<NotificationInterface>
    implements NotificationInterface
  {
    id: number;

    to: number;

    message: string;

    type: string;

    view: boolean;

    entityId: number;

    entityName: string;

    static associate(models: any): void {
      Notification.belongsTo(models.User);
    }
  }
  Notification.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      to: {
        type: DataTypes.INTEGER,
      },

      message: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      type: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      entityName: {
        type: DataTypes.STRING,
      },

      entityId: {
        type: DataTypes.INTEGER,
      },
      view: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },

    {
      // hooks: {
      //   afterFind: (name, option) => {
      //     // console.log('\n\n\n Some thing ');
      //     // console.log({name, option});
      //   },
      // },
      sequelize,
      modelName: 'Notification',
    }
  );
  return Notification;
};
