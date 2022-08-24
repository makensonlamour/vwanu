/* eslint-disable no-param-reassign */
import { Model } from 'sequelize';

export interface ConversationInterface {
  id: string;
  amountOfPeople: number;
  amountOfMessages: number;
  amountOfUnreadMessages: number;
  type: string;
  name: string;
}
export default (sequelize: any, DataTypes: any) => {
  class Conversation
    extends Model<ConversationInterface>
    implements ConversationInterface
  {
    id: string;

    amountOfPeople: number;

    amountOfMessages: number;

    amountOfUnreadMessages: number;

    type: string;

    name: string;

    static associate(models: any): void {
      Conversation.belongsToMany(models.User, {
        through: 'Conversation_Users',
      });
      Conversation.hasMany(models.Message);
    }
  }
  Conversation.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
      },

      amountOfPeople: { type: DataTypes.INTEGER, defaultValue: 0 },
      type: {
        type: DataTypes.ENUM('group', 'direct'),
        defaultValue: 'direct',
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      amountOfMessages: { type: DataTypes.INTEGER, defaultValue: 0 },
      amountOfUnreadMessages: { type: DataTypes.INTEGER, defaultValue: 0 },
    },

    {
      hooks: {},
      sequelize,
      modelName: 'Conversation',
    }
  );
  return Conversation;
};
