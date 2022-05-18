/* eslint-disable import/no-import-module-exports */
import { Model } from 'sequelize';

// Custom imports
import { ProfileInterface } from '../schema/profile';

module.exports = (sequelize: any, DataTypes: any) => {
  class Profile extends Model<ProfileInterface> implements ProfileInterface {
    id?: number | undefined;

    lastName: string;

    firstName: string;

    dob: Date;

    profilePicture: string;

    coverPicture: string;

    followers?: string;

    followings: string | undefined;

    postText: string;

    // static associate(models: any): void {
    //   Profile.belongsTo(models.User, {
    //     onDelete: 'CASCADE',
    //   });
    //   Profile.hasMany(models.Post, {
    //     onDelete: 'CASCADE',
    //   });
    // }
  }
  Profile.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },

      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      dob: {
        type: DataTypes.DATE,
        allowNull: false,
      },

      profilePicture: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      coverPicture: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      followers: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      followings: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'Profile',
    }
  );
  return Profile;
};
