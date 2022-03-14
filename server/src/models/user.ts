/* eslint-disable import/no-import-module-exports */

import { nanoid } from 'nanoid';
import { Model } from 'sequelize';

// Custom imports
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { UpUserInterface as UserInterface } from '../schema/user';
import createToken from '../lib/utils/createToken';

module.exports = (sequelize: any, DataTypes: any) => {
  class User extends Model<UserInterface> implements UserInterface {
    id: number | undefined;

    email: string;

    activationKey?: string | null;

    resetPasswordKey?: string | undefined;

    verified?: boolean | undefined;

    password: string | undefined;

    username?: string | undefined;

    firstName: string;

    lastName: string;

    avatar: string | undefined;

    cover: string;

    backgroundImage: string;

    backgroundImageStatus: boolean;

    address: string;

    working: string;

    workingLink: string;

    about: string;

    school: string;

    gender: string;

    birthday: string;

    countryId: number;

    website: string;

    facebook: string;

    google: string;

    twitter: string;

    linkedin: string;

    youtube: string;

    vk: string;

    instagram: string;

    qq: string;

    wechat: string;

    discord: string;

    mailru: string;

    language: string;

    followPrivacy: boolean;

    friendPrivacy: boolean;

    postPrivacy: string;

    messagePrivacy: string;

    lastSeenPrivacy: boolean;

    active: boolean;

    admin: boolean;

    static async setPassword(password: string): Promise<string> {
      const passwordHash = await bcrypt.hash(password, 12);
      return passwordHash;
    }

    static async register(
      user: Partial<UserInterface>,
      password: string
    ): Promise<UserInterface> {
      const hash = await this.setPassword(password.toString());
      const created = await this.create({ ...user, password: hash });
      return created;
    }

    static login(user: UserInterface, cb: jwt.SignCallback) {
      return createToken(user, cb);
    }

    static associate(models: any) {
      // define association here
      // User.hasOne(models.Profile);
      // User.hasMany(models.Page, {
      //   onDelete: 'CASCADE',
      // });

      User.hasMany(models.Post);
    }
  }
  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      gender: {
        type: DataTypes.STRING,
        defaultValue: 'm',
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

      cover: {
        type: DataTypes.STRING,
        defaultValue:
          'https://images.unsplash.com/photo-1528464884105-28166ef8edd0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
      },
      website: {
        type: DataTypes.STRING,
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
