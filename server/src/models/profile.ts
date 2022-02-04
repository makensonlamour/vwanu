'use strict'
import { Model } from 'sequelize'

export interface ProjectInterface {
  id?: number | undefined
  profilePicture?: string
  coverPicture?: string
  followers?: number
  followings?: number | undefined
  desc?: string
  city?: string
}
module.exports = (sequelize: any, DataTypes: any) => {
  class Profile extends Model<ProjectInterface> implements ProjectInterface {
    id?: number | undefined
    profilePicture: string
    coverPicture: string
    followers?: number
    followings: number | undefined
    desc: string
    city: string

    static associate(models: any): void {
      Profile.belongsTo(models.User)
    }
  }
  Profile.init(
    {
      id: { type: DataTypes.NUMBER, autoIncrement: true, primaryKey: true },
      profilePicture: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      coverPicture: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      followers: {
        type: DataTypes.NUMBER,
        allowNull: true,
      },
      followings: {
        type: DataTypes.NUMBER,
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
      modelName: 'profile',
    }
  )
  return Profile
}
