'use strict'
import { Model } from 'sequelize'

export interface PostInterface {
  id?: number | undefined
  media: string
  mediaType: string
  body?: string
  hashTag: string | undefined
  private?: boolean
}
module.exports = (sequelize: any, DataTypes: any) => {
  class Post extends Model<PostInterface> implements PostInterface {
    id: number | undefined
    media: string
    mediaType: string
    body?: string
    hashTag: string | undefined
    private: boolean | undefined

    static associate(models: any): void {
      Post.belongsToMany(models.Page, {
        as: 'pagePost',
        through: 'pagePostTable',
      })

      Post.belongsToMany(models.Profile, {
        as: 'profilePost',
        through: 'profilePostTable',
      })
      Post.belongsToMany(models.Profile, {
        as: 'tag',
        through: 'tagTable',
      })

      Post.hasMany(models.Like)
      Post.hasMany(models.Comment)
    }
  }
  Post.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      media: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      mediaType: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      body: {
        type: DataTypes.TEXT,
        allowNull: true,
      },

      hashTag: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      private: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },

    {
      sequelize,
      modelName: 'Post',
    }
  )
  return Post
}
