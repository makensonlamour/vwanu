/* eslint-disable import/no-import-module-exports */

import { Model } from 'sequelize';

export interface CommunityInterface {
  id: string;

  name: string;

  coverPicture: string;

  profilePicture: string;

  privacyType: boolean;

  UserId: number;

  numMembers: number;

  numAdmins: number;
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

    numMembers: number;

    numAdmins: number;

    static associate(models: any): void {
      Community.belongsToMany(models.User, {
        as: 'members',
        through: 'community-members',
      });
      Community.belongsToMany(models.User, {
        as: 'creator',
        through: 'community-creator',
      });
      Community.belongsToMany(models.User, {
        as: 'moderators',
        through: 'community-moderators',
      });
      Community.belongsToMany(models.User, {
        as: 'administrators',
        through: 'community-administrators',
      });
      Community.belongsToMany(models.User, {
        as: 'administratorsRequest',
        through: 'community-administratorsRequest',
      });
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
      numMembers: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      numAdmins: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
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
