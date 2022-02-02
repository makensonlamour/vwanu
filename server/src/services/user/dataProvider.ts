import db from '../../models'

const DataProvider = {
  getUser: async (userId: number|string) => {
    return new Promise(function (resolve, reject) {
      db.User.findOne({
        where: { id: userId },
        attributes: { exclude: ['password'] },
      })
        .then((data: any) => {
          resolve(data)
        })
        .catch((err: any) => {
          reject(err)
        })
    })
  },

  createUser: async (body: any) => {
    return new Promise(function (resolve, reject) {
      db.User.create(body)
        .then((data: any) => {
          resolve(data)
        })
        .catch((err: any) => {
          reject(err)
        })
    })
  },

  updateUser: async (userId: number|string, body: any) => {
    return new Promise(function (resolve, reject) {
      db.User.update(body, { where: { id: userId } })
        .then((data: any) => {
          resolve(data)
        })
        .catch((err: any) => {
          reject(err)
        })
    })
  },

  deleteUser: async (userId: number|string) => {
    return new Promise(function (resolve, reject) {
      db.User.destroy({ where: { id: userId } })
        .then((data: any) => {
          resolve(data)
        })
        .catch((err: any) => {
          reject(err)
        })
    })
  },
}

export default DataProvider
