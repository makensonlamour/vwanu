/* eslint-disable no-param-reassign */
/* eslint-disable import/no-import-module-exports */

import { Model } from 'sequelize';

export interface ReactionInterface {
  id: string;
  content: string;
  entityType: string;
}
export default (sequelize: any, DataTypes: any) => {
  class Reaction extends Model<ReactionInterface> implements ReactionInterface {
    id: string;

    content: string;

    entityType: string;

    static associate(models: any): void {
      Reaction.belongsTo(models.User);
      Reaction.belongsTo(models.Post, {
        foreignKey: 'entityId',
        constraints: false,
      });
      Reaction.belongsTo(models.Discussion, {
        foreignKey: 'entityId',
        constraints: false,
      });
      Reaction.belongsTo(models.Community, {
        foreignKey: 'entityId',
        constraints: false,
      });
      Reaction.belongsTo(models.Blog, {
        foreignKey: 'entityId',
        constraints: false,
      });
    }
  }
  Reaction.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
      },
      content: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      entityType: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },

    {
      sequelize,
      modelName: 'Reaction',
    }
  );
  return Reaction;
};
