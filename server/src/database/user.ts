/* eslint-disable import/no-import-module-exports */
import { nanoid } from 'nanoid';
import { Model } from 'sequelize';

// Custom imports

import { UpUserInterface as UserInterface } from '../schema/user';

export const authorizationEnums = ['public', 'private', 'friend'];
export default (sequelize: any, DataTypes: any) => {
  class User extends Model<UserInterface> implements UserInterface {
    id: string;

    about: string;

    admin: boolean;

    address: string;

    active: boolean;

    avatar: string | undefined;

    activationKey?: string | null;

    birthday: string;

    backgroundImage: string;

    backgroundImageStatus: boolean;

    countryId: number;

    country: string | undefined;

    coverPicture: string | undefined;

    discord: string;

    email: string;

    facebook: string;

    firstName: string;

    profilePrivacy: string;

    followPrivacy: string;

    friendPrivacy: string;

    phonePrivacy: boolean;

    friendListPrivacy: string;

    emailPrivacy: boolean;

    gender: string;

    google: string;

    instagram: string;

    lastSeen: Date;

    lastName: string;

    linkedin: string;

    language: string;

    loginAttempts: number;

    lastSeenPrivacy: boolean;

    mailru: string;

    messagePrivacy: string;

    online: boolean;

    postPrivacy: string;

    password: string | undefined;

    profilePicture: string | undefined;

    qq: string;

    resetExpires: Date;

    resetAttempts: number;

    relationshipId: string;

    resetPasswordKey?: string | undefined;

    resetShortPasswordKey?: string | undefined;

    school: string;

    search_vector: string;

    twitter: string;

    username?: string | undefined;

    vk: string;

    tiktok: string;

    verified?: boolean | undefined;

    wechat: string;

    website: string;

    working: string;

    workingLink: string;

    youtube: string;

    showLastSeen: boolean;

    eVisitedNotified: boolean;

    youtubePrivacy: boolean;

    linkedinPrivacy: boolean;

    twitterPrivacy: boolean;

    faceBookPrivacy: boolean;

    instagramPrivacy: boolean;

    static associate(models: any) {
      User.hasMany(models.Post, {
        onDelete: 'CASCADE',
      });
      User.hasMany(models.Discussion, {
        onDelete: 'CASCADE',
      });
      User.hasMany(models.Message, {
        onDelete: 'CASCADE',
      });
      User.hasMany(models.Call, {
        onDelete: 'CASCADE',
      });

      User.hasMany(models.Interest);
      User.hasMany(models.Blog, {
        onDelete: 'CASCADE',
      });
      User.belongsToMany(models.Address, {
        through: 'EntityAddress',
        as: 'addresses',
      });
      User.belongsToMany(models.User, {
        as: 'Follower',
        through: 'User_Follower',
      });
      User.belongsToMany(models.User, {
        as: 'Following',
        through: 'User_Following',
      });

      // User.hasMany(models.User, { as: 'friends' });
      User.belongsToMany(models.User, {
        through: 'User_friends',
        as: 'friends',
      });
      User.belongsToMany(models.User, {
        through: 'User_friends_request',
        as: 'friendsRequest',
      });
      User.belongsToMany(models.User, {
        through: 'User_friends_Want_to_Be',
        as: 'FriendshipRequested',
      });

      User.belongsToMany(models.User, {
        through: 'User_friends_undesired',
        as: 'undesiredFriends',
      });

      // User.belongsToMany(models.User, {
      //   through: 'User_visitors',
      //   as: 'Visitor',
      //   constraints: false,
      //   unique: false,
      // });

      // User.belongsToMany(models.User, {
      //   as: 'follower',
      //   through: models.UserFollower,
      // });
      // User.belongsToMany(models.User, {
      //   as: 'followed',
      //   through: models.UserFollower,
      // });
    }
  }
  User.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
      },
      resetAttempts: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      loginAttempts: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        // @ts-ignore
        level: 'C',
      },

      discord: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
      },

      friendPrivacy: {
        type: DataTypes.STRING,
        defaultValue: 'public',
        validate: {
          customValidator: (value) => {
            if (!authorizationEnums.includes(value)) {
              throw new Error(
                `${value} is not a valid option for friendPrivacy`
              );
            }
          },
        },
      },
      friendListPrivacy: {
        type: DataTypes.STRING,
        defaultValue: 'public',
        validate: {
          customValidator: (value) => {
            if (!authorizationEnums.includes(value)) {
              throw new Error(
                `${value} is not a valid option for friendListPrivacy`
              );
            }
          },
        },
      },

      youtubePrivacy: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },

      linkedinPrivacy: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },

      twitterPrivacy: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },

      faceBookPrivacy: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },

      instagramPrivacy: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      followPrivacy: {
        type: DataTypes.STRING,
        defaultValue: 'public',
        validate: {
          customValidator: (value) => {
            if (!authorizationEnums.includes(value)) {
              throw new Error(
                `${value} is not a valid option for followPrivacy`
              );
            }
          },
        },
      },
      profilePrivacy: {
        type: DataTypes.STRING,
        defaultValue: 'public',
        validate: {
          customValidator: (value) => {
            if (!authorizationEnums.includes(value)) {
              throw new Error(
                `${value} is not a valid option for profilePrivacy`
              );
            }
          },
        },
      },

      wechat: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
      },
      facebook: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
      },

      tiktok: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
      },
      mailru: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
      },

      qq: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
      },

      vk: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
      },

      instagram: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
      },

      youtube: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
      },

      linkedin: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
      },
      twitter: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
      },

      relationshipId: {
        type: DataTypes.UUID,
        allowNull: true,
      },
      avatar: { type: DataTypes.STRING, allowNull: true, unique: true },
      username: { type: DataTypes.STRING, allowNull: true, unique: true },
      birthday: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      backgroundImage: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
      },
      backgroundImageStatus: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        // @ts-ignore
        level: 'B',
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        // @ts-ignore
        level: 'A',
      },

      gender: {
        type: DataTypes.STRING,
        defaultValue: 'Not specified',
        validate: {
          customValidator: (value) => {
            if (!['f', 'm', 'Not specified'].includes(value)) {
              throw new Error(`${value} is not a valid option for gender`);
            }
          },
        },
      },

      google: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      country: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      about: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      language: {
        type: DataTypes.STRING,
        defaultValue: 'en',
      },
      activationKey: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: () => nanoid(),
      },
      resetPasswordKey: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      verified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      emailPrivacy: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      phonePrivacy: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },

      showLastSeen: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      eVisitedNotified: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },

      lastSeenPrivacy: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },

      admin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },

      online: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      lastSeen: {
        type: DataTypes.DATE,
        defaultValue: new Date(),
      },

      resetExpires: {
        type: DataTypes.DATE,
        allowNull: true,
      },

      coverPicture: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue:
          'https://images.unsplash.com/photo-1528464884105-28166ef8edd0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
      },
      profilePicture: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue:
          'https://images.unsplash.com/photo-1528464884105-28166ef8edd0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
      },
      website: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      search_vector: {
        type: DataTypes.TSVECTOR,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'User',
    }
  );
  return User;
};
