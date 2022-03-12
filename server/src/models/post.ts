/* eslint-disable import/no-import-module-exports */

import { Model } from 'sequelize';

export interface PostInterface {
  id?: number | undefined;
  media: string;
  mediaType: string;
  postText?: string;
  hashTag: string | undefined;
  private?: boolean;
  // postLink: string | undefined;
}
module.exports = (sequelize: any, DataTypes: any) => {
  class Post extends Model<PostInterface> implements PostInterface {
    id: number | undefined;

    media: string | undefined;

    mediaType: string;

    postText?: string;

    hashTag: string | undefined;

    private: boolean | undefined;

    postLink: string | undefined;

    static associate(models: any): void {
      Post.belongsTo(models.User);
      // Post.belongsToMany(models.Page, {
      //   as: 'pagePost',
      //   through: 'pagePostTable',
      // });
      // Post.belongsToMany(models.User, {
      //   as: 'UserPost',
      //   through: 'UserPostTable',
      // });
      // Post.belongsToMany(models.Profile, {
      //   as: 'profilePost',
      //   through: 'profilePostTable',
      // });

      // Post.hasMany(models.Like);
      // Post.hasMany(models.Comment);
    }
  }
  Post.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      media: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      mediaType: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      postText: {
        type: DataTypes.TEXT,
        allowNull: true,
      },

      hashTag: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      private: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },

    {
      sequelize,
      modelName: 'Post',
    }
  );
  return Post;
};
