/* eslint-disable no-param-reassign */
import { Model } from 'sequelize';
import sanitizeHtml from '../lib/utils/sanitizeHtml';

export interface MessageInterface {
  id: string;
  messageText: string;
  read: boolean;
  received: boolean;
  readDate: Date;
  receivedDate: Date;
}
export default (sequelize: any, DataTypes: any) => {
  class Message extends Model<MessageInterface> implements MessageInterface {
    id: string;

    messageText: string;

    read: boolean;

    received: boolean;

    readDate: Date;

    receivedDate: Date;

    static associate(models: any): void {
      Message.belongsTo(models.User, { as: 'sender' });
      Message.belongsTo(models.Conversation);
      Message.belongsToMany(models.Media, { through: 'Message_Media' });
    }
  }
  Message.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
      },

      messageText: {
        type: DataTypes.TEXT,
        allowNull: true,
      },

      received: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },

      read: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      receivedDate: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      readDate: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },

    {
      hooks: {
        beforeSave: (data) => {
          if (data.messageText)
            data.messageText = sanitizeHtml(data.messageText);
        },
      },
      sequelize,
      modelName: 'Message',
    }
  );
  return Message;
};
