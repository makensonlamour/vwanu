/* eslint-disable import/no-import-module-exports */

import { Model } from 'sequelize';

export interface PostInterface {

  id: number;
  multiImage: boolean;
  imageCount: number;
  multiVideo: boolean;
  videoCount: number;
  multiAudio: boolean;
  audioCount: number;
  postText: string;
  privacyType: string;
}
module.exports = (sequelize: any, DataTypes: any) => {
  class Post extends Model<PostInterface> implements PostInterface {
    id: number;

    multiImage: boolean;

    imageCount: number;

    multiVideo: boolean;

    videoCount: number;

    multiAudio: boolean;

    audioCount: number;

    postText: string;

    privacyType: string;

    static associate(models: any): void {
      Post.belongsTo(models.User);
      // Post.hasMany(models.Media)

    }
  }
  Post.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      multiImage: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },

      multiAudio: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      multiVideo: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,

      },
      postText: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      imageCount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      videoCount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      audioCount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      privacyType: {
        type: DataTypes.ENUM(
          'public',
          'private',
          'friendsOnly',
          'friendOfFriends'
        ),
        defaultValue: 'public',
      },
    },

    {
      sequelize,
      modelName: 'Post',
    }
  );
  return Post;
};
