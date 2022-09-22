/* eslint-disable no-param-reassign */
/* eslint-disable import/no-import-module-exports */

import { Model } from 'sequelize';

export interface ReactionInterface {
  id: number;
  content: string;
}
export default (sequelize: any, DataTypes: any) => {
  class Reaction extends Model<ReactionInterface> implements ReactionInterface {
    id: number;

    content: string;

    static associate(models: any): void {
      Reaction.belongsTo(models.User);
      Reaction.belongsTo(models.Post);
      Reaction.belongsTo(models.Discussion);
    }
  }
  Reaction.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      content: {
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
