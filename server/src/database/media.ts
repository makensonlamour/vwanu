/* eslint-disable no-param-reassign */
/* eslint-disable import/no-import-module-exports */

import { Model } from 'sequelize';
import config from 'config';

const tinySize = config.get('tinySize');
const smallSize = config.get('smallSize');
const mediumSize = config.get('mediumSize');

export interface MediaInterface {
  id: number;
  original: string;
  large: string;
  medium: string;
  small: string;
  tiny: string;
}
export default (sequelize: any, DataTypes: any) => {
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
      // Media.hasMany(models.Post, {
      //   onDelete: 'CASCADE',
      // });
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
      hooks: {
        beforeSave: (record) => {
          const { tiny, small, medium, original } = record;

          record.medium =
            medium !== undefined
              ? medium
              : original.replace(/\upload\//g, `upload/${mediumSize}/`);
          record.small =
            small !== undefined
              ? small
              : original.replace(/\upload\//g, `upload/${smallSize}/`);
          record.tiny =
            tiny !== undefined
              ? tiny
              : original.replace(/\upload\//g, `upload/${tinySize}/`);
        },
      },

      sequelize,
      modelName: 'Media',
    }
  );
  return Media;
};
