import { Model } from 'sequelize';

export interface BlogInterface {
  id: number;
  blogText: string;
  blogTitle: string;
  privacyType: string;
  categories: string[];
}
export default (sequelize: any, DataTypes: any) => {
  class Blog extends Model<BlogInterface> implements BlogInterface {
    id: number;

    blogText: string;

    blogTitle: string;

    privacyType: string;

    categories: string[];

    static associate(models: any): void {
      Blog.belongsTo(models.User);
      // Blog.belongsToMany(models.Media, {
      //   through: 'Blog_Media',
      // });
      Blog.hasMany(models.Blog, { as: 'Response' });
      // Blog.hasMany(models.Reaction);
    }
  }
  Blog.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },

      blogText: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      blogTitle: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      categories: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      privacyType: {
        type: DataTypes.STRING,
        defaultValue: 'private',
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
      modelName: 'Blog',
    }
  );
  return Blog;
};
