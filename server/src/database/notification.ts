/* eslint-disable import/no-import-module-exports */

import { Model } from 'sequelize';

export interface NotificationInterface {
  id: number;
  from: number;
  message: string;
  type: string;
  view: boolean;
}
export default (sequelize: any, DataTypes: any) => {
  class Notification
    extends Model<NotificationInterface>
    implements NotificationInterface
  {
    id: number;

    from: number;

    message: string;

    type: string;

    view: boolean;

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
      from: {
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
