/* eslint-disable import/no-import-module-exports */

import { Model } from 'sequelize';

export interface CommunityInterface {
  id: string;

  name: string;

  coverPicture: string;

  profilePicture: string;

  privacyType: boolean;

  UserId: number;
}
export default (sequelize: any, DataTypes: any) => {
  class Community
    extends Model<CommunityInterface>
    implements CommunityInterface
  {
    id: string;

    name: string;

    coverPicture: string;

    profilePicture: string;

    privacyType: boolean;

    UserId: number;

    static associate(models: any): void {
      Community.hasMany(models.User, { as: 'members' });
      Community.hasOne(models.User, { as: 'creator' });
      Community.hasMany(models.User, { as: 'moderators' });
      Community.hasMany(models.User, { as: 'administrators' });
    }
  }
  Community.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
      },
      UserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      coverPicture: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      profilePicture: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      privacyType: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },

    {
      sequelize,
      modelName: 'Community',
    }
  );
  return Community;
};
