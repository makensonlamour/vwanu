/* eslint-disable import/no-import-module-exports */

import { Model } from 'sequelize';

export interface PostInterface {
  id: string;

  postText: string;
  privacyType: string;
}
export default (sequelize: any, DataTypes: any) => {
  class Post extends Model<PostInterface> implements PostInterface {
    id: string;

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
      Post.hasMany(models.Reaction, {
        foreignKey: 'entityId',
        constraints: false,
        scope: {
          entityType: 'Post',
        },
      });
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

      postText: {
        type: DataTypes.TEXT,
        allowNull: true,
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
