/* eslint-disable import/no-import-module-exports */

import { Model } from 'sequelize';

export interface BlogResponseInterface {
  id: string;
  responseText: string;
  banned: boolean;
  bannedReason: string;
  bannedBy: number;
}
export default (sequelize: any, DataTypes: any) => {
  class BlogResponse
    extends Model<BlogResponseInterface>
    implements BlogResponseInterface
  {
    id: string;

    responseText: string;

    banned: boolean;

    bannedReason: string;

    bannedBy: number;

    static associate(models: any): void {
      BlogResponse.belongsTo(models.User);
      BlogResponse.belongsTo(models.Blog);
      BlogResponse.hasMany(models.BlogResponse, { as: 'SubResponse' });
    }
  }
  BlogResponse.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
      },

      responseText: {
        type: DataTypes.TEXT,
        allowNull: false,
      },

      banned: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },

      bannedReason: {
        type: DataTypes.TEXT,
        allowNull: true,
      },

      bannedBy: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },

    {
      sequelize,
      modelName: 'BlogResponse',
    }
  );
  return BlogResponse;
};
