/* eslint-disable import/no-import-module-exports */

import { Model } from 'sequelize';

export interface PostInterface {
  id: string;
  multiImage: boolean;
  imageCount: number;
  multiVideo: boolean;
  videoCount: number;
  multiAudio: boolean;
  audioCount: number;
  postText: string;
  privacyType: string;
}
export default (sequelize: any, DataTypes: any) => {
  class Post extends Model<PostInterface> implements PostInterface {
    id: string;

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
      Post.belongsTo(models.Community, { onDelete: 'CASCADE' });
      Post.belongsToMany(models.Media, {
        through: 'Post_Media',
      });
      Post.belongsTo(models.Media, {
        as: 'Media-comment',
        foreignKey: 'mediaId',
      });
      Post.hasMany(models.Post, { as: 'Comments' });
      Post.hasMany(models.Reaction);
    }
  }
  Post.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
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
        type: DataTypes.STRING,
        defaultValue: 'public',
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
      modelName: 'Post',
    }
  );
  return Post;
};
