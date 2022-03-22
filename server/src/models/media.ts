/* eslint-disable import/no-import-module-exports */

import { Model } from 'sequelize';

export interface MediaInterface {
  id: number;
  original: string;
  large: string;
  medium: string;
  small: string;
  tiny: string;
}
module.exports = (sequelize: any, DataTypes: any) => {
  class Media extends Model<MediaInterface> implements MediaInterface {
    id: number;

    original: string;

    large: string | undefined;

    medium: string | undefined;

    small: string | undefined;

    tiny: string | undefined;

    static associate(models: any): void {
      Media.belongsTo(models.User);
      Media.belongsToMany(models.Post, {
        through: 'Post_Media',
      });
    }
  }
  Media.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      original: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      medium: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      large: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      small: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      tiny: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },

    {
      sequelize,
      modelName: 'Media',
    }
  );
  return Media;
};
