/* eslint-disable no-param-reassign */
import { Model } from 'sequelize';
import slugify from '../lib/utils/slugify';
import sanitizeHtml from '../lib/utils/sanitizeHtml';

export interface BlogInterface {
  id: string;
  blogText: string;
  blogTitle: string;
  coverPicture: string;
  publish: boolean;
  slug: string;
}
export default (sequelize: any, DataTypes: any) => {
  class Blog extends Model<BlogInterface> implements BlogInterface {
    id: string;

    blogText: string;

    blogTitle: string;

    publish: boolean;

    coverPicture: string;

    slug: string;

    static associate(models: any): void {
      Blog.belongsTo(models.User);
      Blog.belongsToMany(models.Media, {
        through: 'Blog_Media',
      });
      Blog.belongsToMany(models.Interest, { through: 'Blog_Interest' });
      Blog.hasMany(models.Blog, { as: 'Response' });
      Blog.hasMany(models.Reaction);
    }
  }
  Blog.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
      },
      coverPicture: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      slug: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      blogText: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      blogTitle: {
        type: DataTypes.TEXT,
        allowNull: false,
      },

      publish: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },

    {
      hooks: {
        beforeSave: (data) => {
          data.blogText = sanitizeHtml(data.blogText);
          data.blogTitle = sanitizeHtml(data.blogTitle);
          data.slug = slugify(data.blogTitle, {
            replacement: '-',
            lower: true,
            strict: true,
          });
        },
      },
      sequelize,
      modelName: 'Blog',
    }
  );
  return Blog;
};
