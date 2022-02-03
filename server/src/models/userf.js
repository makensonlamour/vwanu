import { DataTypes } from 'sequelize'
// Custom core
import { sequelize } from '../lib/utils/database'
import { defineUser } from '../lib/Vwanu-Local-Sequelize'

const User = defineUser(sequelize, {
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
    allowNull: true,
  },
})

export default User
