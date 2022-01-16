import User from '../../models/user.js'

const DataProvider = {
  getUser: async (userId) => {
    return new Promise(function (resolve, reject) {
      User.findOne({
        where: { id: userId },
        attributes: { exclude: ['password'] },
      })
        .then((data) => {
          resolve(data)
        })
        .catch((err) => {
          reject(err)
        })
    })
  },

  createUser: async (body) => {
    return new Promise(function (resolve, reject) {
      User.create(body)
        .then((data) => {
          resolve(data)
        })
        .catch((err) => {
          reject(err)
        })
    })
  },

  updateUser: async (userId, body) => {
    return new Promise(function (resolve, reject) {
      User.update(body, { where: { id: userId } })
        .then((data) => {
          resolve(data)
        })
        .catch((err) => {
          reject(err)
        })
    })
  },

  deleteUser: async (userId) => {
    return new Promise(function (resolve, reject) {
      User.destroy({ where: { id: userId } })
        .then((data) => {
          resolve(data)
        })
        .catch((err) => {
          reject(err)
        })
    })
  },
}

export default DataProvider
