/* eslint-disable no-param-reassign */
/* eslint-disable import/no-import-module-exports */

import { Model } from 'sequelize';

export interface ReactionInterface {
  id: number;
  content: string;
}
module.exports = (sequelize: any, DataTypes: any) => {
  class Reaction extends Model<ReactionInterface> implements ReactionInterface {
    id: number;

    content: string;

    static associate(models: any): void {
      Reaction.belongsTo(models.User);
      Reaction.belongsTo(models.Post);
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
      hooks: {
        beforeValidate: (data) => {
          console.log('beforeValidate');
          console.log(JSON.stringify(data));
        },
      },
      sequelize,
      modelName: 'Reaction',
    }
  );
  return Reaction;
};
