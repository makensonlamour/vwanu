import Sequelize from 'sequelize'

// Custom dependencies
import db from '../src/utils/database.js'

db.sequelize.define('Profile', {
  userId: {
    type: Sequelize.STRING,
    required: true,
  },
  profilePicture: {
    type: Sequelize.STRING,
    default: '',
  },
  coverPicture: {
    type: Sequelize.STRING,
    default: '',
  },
  followers: {
    type: Array,
    default: [],
  },
  followings: {
    type: Array,
    default: [],
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  desc: {
    type: Sequelize.STRING,
    max: 50,
  },
  city: {
    type: Sequelize.STRING,
    max: 50,
  },
  from: {
    type: Sequelize.STRING,
    max: 50,
  },
  relationship: {
    type: Number,
    enum: [1, 2, 3],
  },
})
