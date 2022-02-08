'use strict'
import { Model } from 'sequelize'
// Custom imports
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import createToken from '../lib/utils/createToken'

export interface UserInterface {
  id?: number | undefined
  email: String
  hash: String
  salt: String
  activationKey?: String | undefined
  resetPasswordKey?: String | undefined
  verified?: boolean | undefined
}
module.exports = (sequelize: any, DataTypes: any) => {
  class User extends Model<UserInterface> implements UserInterface {
    id: number | undefined
    email!: String
    hash!: String
    salt!: String
    activationKey?: String | undefined
    resetPasswordKey?: String | undefined
    verified?: boolean | undefined
    static async setPassword(
      password: string
    ): Promise<{ hashPassword: string; salt: string }> {
      const salt = await bcrypt.genSalt(12)
      const hashPassword = await bcrypt.hash(password, salt)
      return { hashPassword, salt }
    }

    static async register(
      user: {
        email: string
        password: string
      },
      password: string
    ): Promise<any> {
      const { hashPassword, salt } = await this.setPassword(password.toString())
      console.log({ hashPassword, salt })
      const { password: p, ...rest } = user
      const newUser: UserInterface = { ...rest, hash: hashPassword, salt }

      const created = await this.create(newUser)
      return created
    }

    static login(user: UserInterface, cb: jwt.SignCallback) {
      return createToken(user, cb)
    }
    static associate(models: any) {
      // define association here
      User.hasOne(models.Profile)
      User.hasMany(models.Page, {
        onDelete: 'CASCADE',
      })
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
      hash: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      salt: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      activationKey: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      resetPasswordKey: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      verified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: 'User',
    }
  )
  return User
}
