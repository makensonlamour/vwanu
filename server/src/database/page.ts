/* eslint-disable import/no-import-module-exports */


import { Model } from 'sequelize'

export interface PageInterface {
  id: number | undefined
  pagePicture?: String
  pageCoverPicture?: String
  followers?: number
  desc?: String
}
module.exports = (sequelize: any, DataTypes: any) => {
  class Page extends Model<PageInterface> implements PageInterface {
    id: number | undefined

    pagePicture?: String

    pageCoverPicture?: String

    followers?: number

    desc?: String

    // static associate(models: any): void {
    //   Page.belongsTo(models.User)
    //   Page.hasMany(models.Post, {
    //     onDelete: 'CASCADE',
    //   })
    //   Page.hasMany(models.Like)
    // }
  }
  Page.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      pagePicture: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      pageCoverPicture: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      followers: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },

      desc: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'Page',
    }
  )
  return Page
}
