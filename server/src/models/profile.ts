'use strict'
import { Model } from 'sequelize'

export interface ProfileInterface {
  id?: number | undefined
  profilePicture?: String
  coverPicture?: String
  followers?: number
  followings?: number | undefined
  desc?: String
  city?: String
}
module.exports = (sequelize: any, DataTypes: any) => {
  class Profile extends Model<ProfileInterface> implements ProfileInterface {
    id?: number | undefined
    profilePicture: string
    coverPicture: string
    followers?: number
    followings: number | undefined
    desc: string
    city: string

    static associate(models: any): void {
      Profile.belongsTo(models.User)
      Profile.hasMany(models.Post, {
        onDelete: 'CASCADE',
      })
      
    }
  }
  Profile.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
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
      desc: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      city: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'Profile',
    }
  )
  return Profile
}
