/* eslint-disable no-param-reassign */
import { Model } from 'sequelize';

export interface ForumCategoryInterface {
  id: string;
  name: string;
  description: string;
  coverPicture: string;
  search_vector: string;
}
export default (sequelize: any, DataTypes: any) => {
  class ForumCategory
    extends Model<ForumCategoryInterface>
    implements ForumCategoryInterface
  {
    id: string;

    name: string;

    description: string;

    coverPicture: string;

    search_vector: string;

    static associate(models: any): void {
      ForumCategory.hasMany(models.Interest);
    }
  }
  ForumCategory.init(
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

      description: {
        type: DataTypes.TEXT,
        allowNull: true,
        // @ts-ignore
        level: 'C',
      },
      name: {
        type: DataTypes.TEXT,
        allowNull: false,
        // @ts-ignore
        level: 'A',
        unique: true,
      },

      search_vector: {
        type: DataTypes.TSVECTOR,
        allowNull: true,
      },
    },

    {
      hooks: {},
      sequelize,
      modelName: 'ForumCategory',
    }
  );
  return ForumCategory;
};
