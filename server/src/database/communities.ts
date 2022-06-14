/* eslint-disable import/no-import-module-exports */

import { Model } from 'sequelize';

export interface CommunityInterface {
  id: string;

  name: string;

  coverPicture: string;

  description: string;

  profilePicture: string;

  privacyType: boolean;

  UserId: number;

  numMembers: number;

  numAdmins: number;

  type: string; // public, hidden , private

  canInvite: string; // all-member, organizers && Mods, org-only

  canInPost: string; // all-member, organizers && Mods, org-only

  canInUploadPhotos: string; // all-member, organizers && Mods, org-only

  canInUploadDoc: string; // all-member, organizers && Mods, org-only

  canInUploadVideo: string; // all-member, organizers && Mods, org-only

  canMessageInGroup: string; // all-member, organizers && Mods, org-only

  haveDiscussionForum: boolean;

  defaultInvitationEmail: string;
}
export default (sequelize: any, DataTypes: any) => {
  class Community
    extends Model<CommunityInterface>
    implements CommunityInterface
  {
    id: string;

    name: string;

    coverPicture: string;

    description: string;

    profilePicture: string;

    privacyType: boolean;

    UserId: number;

    numMembers: number;

    numAdmins: number;

    type: string; // public, hidden , private

    canInvite: string; // all-member, organizers && Mods, org-only

    canInPost: string; // all-member, organizers && Mods, org-only

    canInUploadPhotos: string; // all-member, organizers && Mods, org-only

    canInUploadDoc: string; // all-member, organizers && Mods, org-only

    canInUploadVideo: string; // all-member, organizers && Mods, org-only

    canMessageInGroup: string; // all-member, organizers && Mods, org-only

    haveDiscussionForum: boolean;

    defaultInvitationEmail: string;

    static associate(models: any): void {
      // Community.belongsToMany(models.User, {
      //   as: 'members',
      //   through: 'community-members',
      // });
      Community.belongsToMany(models.User, {
        as: 'creator',
        through: 'community-creator',
      });
      // Community.belongsToMany(models.User, {
      //   as: 'moderators',
      //   through: 'community-moderators',
      // });
      // Community.belongsToMany(models.User, {
      //   as: 'administrators',
      //   through: 'community-administrators',
      // });
      // Community.belongsToMany(models.User, {
      //   as: 'administratorsRequest',
      //   through: 'community-administratorsRequest',
      // });
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

      type: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      coverPicture: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      description: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true,
      },
      profilePicture: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      privacyType: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      canInvite: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      canInPost: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      canInUploadPhotos: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      canInUploadDoc: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      canInUploadVideo: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      canMessageInGroup: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      defaultInvitationEmail: {
        type: DataTypes.TEXT,
        allowNull: true,
      },

      haveDiscussionForum: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },

    {
      sequelize,
      modelName: 'Community',
    }
  );
  return Community;
};
