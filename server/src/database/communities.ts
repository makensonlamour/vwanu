/* eslint-disable import/no-import-module-exports */

import { Model } from 'sequelize';

export interface CommunityInterface {
  id: string;

  name: string;

  coverPicture: string;

  description: string;

  search_vector: string;

  profilePicture: string;

  UserId: number;

  numMembers: number;

  numAdmins: number;

  privacyType: string; // public, hidden , private

  canInvite: string; // all-member, organizers && Mods, org-only

  canInPost: string; // all-member, organizers && Mods, org-only

  canInUploadPhotos: string; // all-member, organizers && Mods, org-only

  canInUploadDoc: string; // all-member, organizers && Mods, org-only

  canInUploadVideo: string; // all-member, organizers && Mods, org-only

  canMessageInGroup: string; // all-member, organizers && Mods, org-only

  haveDiscussionForum: boolean;

  defaultInvitationEmail: string;
}

export const authorizationEnums = ['A', 'M', 'E'];
export default (sequelize: any, DataTypes: any) => {
  class Community
    extends Model<CommunityInterface>
    implements CommunityInterface
  {
    id: string;

    name: string;

    coverPicture: string;

    search_vector: string;

    description: string;

    profilePicture: string;

    UserId: number;

    numMembers: number;

    numAdmins: number;

    privacyType: string; // public, hidden , private

    canInvite: string; // all-member, organizers && Mods, org-only

    canInPost: string; // all-member, organizers && Mods, org-only

    canInUploadPhotos: string; // all-member, organizers && Mods, org-only

    canInUploadDoc: string; // all-member, organizers && Mods, org-only

    canInUploadVideo: string; // all-member, organizers && Mods, org-only

    canMessageInGroup: string; // all-member, organizers && Mods, org-only

    haveDiscussionForum: boolean;

    defaultInvitationEmail: string;

    static associate(models: any): void {
      Community.belongsToMany(models.Interest, {
        through: 'Community_Interest',
      });
      Community.belongsToMany(models.User, {
        as: 'members',
        through: 'CommunityUsers',
      });
      Community.hasOne(models.User);
      // Community.belongsToMany(models.User, {
      //   as: 'moderators',
      //   through: 'community-moderators',
      // });
      // Community.belongsToMany(models.User, {
      //   as: 'administrators',
      //   through: 'community-administrators',
      // });
      Community.hasMany(models.CommunityInvitationRequest);
      Community.hasMany(models.CommunityUsers, {
        foreignKey: 'CommunityId',
        sourceKey: 'id',
        onDelete: 'CASCADE',
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
        type: DataTypes.UUID,
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
        // @ts-ignore
        level: 'A',
      },

      privacyType: {
        type: DataTypes.STRING,
        defaultValue: 'public',
        allowNull: false,
        // @ts-ignore
        level: 'C',
        validate: {
          customValidator: (value) => {
            const enums = ['public', 'hidden', 'private'];
            if (!enums.includes(value)) {
              throw new Error(`${value} is not a valid option for privacyType`);
            }
          },
        },
      },
      coverPicture: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      description: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true,
        // @ts-ignore
        level: 'B',
      },
      profilePicture: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      canInvite: {
        type: DataTypes.STRING,
        defaultValue: 'E',
        allowNull: true,
        validate: {
          customValidator: (value) => {
            if (!authorizationEnums.includes(value)) {
              throw new Error(`${value} is not a valid option for canInvite`);
            }
          },
        },
      },

      canInPost: {
        type: DataTypes.STRING,
        defaultValue: 'E',
        allowNull: true,
        validate: {
          customValidator: (value) => {
            if (!authorizationEnums.includes(value)) {
              throw new Error(`${value} is not a valid option for canInPost`);
            }
          },
        },
      },
      canInUploadPhotos: {
        type: DataTypes.STRING,
        defaultValue: 'E',
        allowNull: true,
        validate: {
          customValidator: (value) => {
            if (!authorizationEnums.includes(value)) {
              throw new Error(
                `${value} is not a valid option for canInUploadPhotos`
              );
            }
          },
        },
      },

      canInUploadDoc: {
        type: DataTypes.STRING,
        defaultValue: 'E',
        allowNull: true,
        validate: {
          customValidator: (value) => {
            if (!authorizationEnums.includes(value)) {
              throw new Error(
                `${value} is not a valid option for canInUploadDoc`
              );
            }
          },
        },
      },

      canInUploadVideo: {
        type: DataTypes.STRING,
        defaultValue: 'E',
        allowNull: true,
        validate: {
          customValidator: (value) => {
            if (!authorizationEnums.includes(value)) {
              throw new Error(
                `${value} is not a valid option for canInUploadVideo`
              );
            }
          },
        },
      },

      canMessageInGroup: {
        type: DataTypes.STRING,
        defaultValue: 'E',
        allowNull: true,
        validate: {
          customValidator: (value) => {
            if (!authorizationEnums.includes(value)) {
              throw new Error(
                `${value} is not a valid option for canMessageInGroup`
              );
            }
          },
        },
      },
      defaultInvitationEmail: {
        type: DataTypes.TEXT,
        allowNull: true,
      },

      haveDiscussionForum: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      search_vector: {
        type: DataTypes.TSVECTOR,
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
