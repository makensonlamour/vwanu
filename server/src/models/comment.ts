/* eslint-disable import/no-import-module-exports */


import { Model } from 'sequelize'

export interface CommentInterface {
  id: number
  body: string
}
module.exports = (sequelize: any, DataTypes: any) => {
  class Comment extends Model<CommentInterface> implements CommentInterface {
    id: number

    body: string

    static associate(models: any): void {
      Comment.belongsTo(models.Post)
      Comment.belongsToMany(models.Profile,{
          as:'commentTag',
          through:'commentTagTable'
      })
      Comment.hasMany(models.Like, { onDelete: 'CASCADE' })
    }
  }
  Comment.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      body: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Comment',
    }
  )
  return Comment
}
