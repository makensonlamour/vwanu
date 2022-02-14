import db from '../../models'
import { UserInterface } from '../../schema/user'

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

  updateUser: async (user: any, fields: Partial<UserInterface>) => {
    return new Promise(function (resolve, reject) {
      user
        .update(fields)
        .then((data: UserInterface) => {
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
  findUserByEmail: async (email: string) => {
    return new Promise(function (resolve, reject) {
      db.User.findOne({ where: { email: email } })
        .then((user) => {
          resolve(user)
        })
        .catch((err) => {
          reject(err)
        })
    })
  },
  resetPassword: async (userId: number | string, password: string) => {
    return new Promise(function (resolve, reject) {
      db.User.setPassword(password).then((hash) => {
        db.User.update({ password: password }, { where: { id: userId } })
          .then((user) => {
            resolve(user)
          })
          .catch((err) => {
            reject(err)
          })
      })
    })
  },
}

export default DataProvider
