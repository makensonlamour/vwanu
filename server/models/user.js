import Sequelize from 'sequelize'
// Custom core
import db from '../src/utils/database.js'
import { defineUser } from '../src/Vwanu-Local-Sequelize/index.js'

const User = defineUser(db, {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  hash: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  salt: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  activationKey: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  resetPasswordKey: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  verified: {
    type: Sequelize.BOOLEAN,
    allowNull: true,
  },
})

export default User
