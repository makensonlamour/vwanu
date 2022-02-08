import db from '../../models'

const DataProvider = {
  getUser: async (userId: number | string) => {
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

  createUser: async (body: any, password: string) => {
    return new Promise(function (resolve, reject) {
      db.User.register(body, password)
        .then((data: any) => {
          resolve(data)
        })
        .catch((err: any) => {
          reject(err)
        })
    })
  },
  loginUser: (user: any, cb: Function) => {
    db.User.login(user, cb)
  },

  updateUser: async (userId: number | string, body: any) => {
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

  deleteUser: async (userId: number | string) => {
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
