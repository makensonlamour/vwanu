/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
/* eslint-disable import/no-import-module-exports */


import { Model } from 'sequelize'

export enum Moods {
  happy,
  joyful,
  sad,
  Like,
  dislike,
}
export interface MoodInstance {
  [mood: number]: boolean
}
export interface LikeInterface {
  id: number
}
module.exports = (sequelize: any, DataTypes: any) => {
  class Like extends Model<LikeInterface> implements LikeInterface {
    id: number

    static associate(models: any): void {
      Like.belongsTo(models.Profile)
      Like.belongsTo(models.Page)
      Like.belongsTo(models.Comment)
    }
  }
  Like.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
    },
    {
      sequelize,
      modelName: 'Like',
    }
  )
  return Like
}
