import db from '../../models';
import { UpUserInterface as UserInterface } from '../../schema/user';

const DataProvider = {
  getUser: async (userId: number | string, option?: any) =>
    new Promise((resolve, reject) => {
      db.User.findOne({
        where: { id: userId },
        ...option,
      })

        .then((data: any) => {
          resolve(data);
        })
        .catch((err: any) => {
          reject(err);
        });
    }),

  createUser: async (body: Partial<UserInterface>, password: string) =>
    new Promise((resolve, reject) => {
      db.User.register(body, password)
        .then((data: any) => {
          resolve(data);
        })
        .catch((err: any) => {
          reject(err);
        });
    }),
  loginUser: (user: UserInterface, cb: Function) => {
    db.User.login(user, cb);
  },

  updateUser: async (user: any, fields: Partial<UserInterface>) =>
    new Promise((resolve, reject) => {
      user
        .update(fields)
        .then((data: UserInterface) => {
          resolve(data);
        })
        .catch((err: any) => {
          reject(err);
        });
    }),

  deleteUser: async (userId: number | string) =>
    new Promise((resolve, reject) => {
      db.User.destroy({ where: { id: userId } })
        .then((data: any) => {
          resolve(data);
        })
        .catch((err: any) => {
          reject(err);
        });
    }),
  findUserByEmail: async (email: string) =>
    new Promise((resolve, reject) => {
      db.User.findOne({ where: { email } })
        .then((user) => {
          resolve(user);
        })
        .catch((err) => {
          reject(err);
        });
    }),
  resetPassword: async (userId: number | string, password: string) =>
    new Promise((resolve, reject) => {
      db.User.setPassword(password).then((newPassword) => {
        db.User.update({ password: newPassword }, { where: { id: userId } })
          .then((user) => {
            resolve(user);
          })
          .catch((err) => {
            reject(err);
          });
      });
    }),
};

export default DataProvider;