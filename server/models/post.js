import Sequelize from 'sequelize'
import db from '../src/utils/database.js'

const Post = db.define('Post', {
  userId: {
    type: Sequelize.STRING,
    required: true,
  },
  desc: {
    type: Sequelize.STRING,
    max: 500,
  },
  img: {
    type: Sequelize.STRING,
  },
  likes: {
    type: Sequelize.ARRAY,
    default: [],
  },
})

export default Post
