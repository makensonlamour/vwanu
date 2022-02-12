'use strict'
import { nanoid } from 'nanoid'
import { Model } from 'sequelize'
// Custom imports

import argon2 from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { UserInterface } from '../schema/user'
import createToken from '../lib/utils/createToken'

module.exports = (sequelize: any, DataTypes: any) => {
  class User extends Model<UserInterface> implements UserInterface {
    id: number | undefined
    email!: string
    activationKey?: string | undefined
    resetPasswordKey?: string | undefined
    verified?: boolean | undefined
    password: string | undefined

    static async setPassword(password: string): Promise<string> {
      const passwordHash = await argon2.hash(password, 12)
      return passwordHash
    }

    static async register(
      user: Partial<UserInterface>,
      password: string
    ): Promise<UserInterface> {
      const hash = await this.setPassword(password.toString())
      const created = await this.create({ ...user, password: hash })
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
      password: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      activationKey: {
        type: DataTypes.STRING,
        allowNull: false,
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
    },
    {
      sequelize,
      modelName: 'User',
    }
  )
  return User
}
