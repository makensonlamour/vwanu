import config from 'config';

// Core imports
import db from '../../models';


const tinySize = config.get('tinySize');
const smallSize = config.get('smallSize');
const mediumSize = config.get('mediumSize');

const DataProvider = {
  getOne: async (userId: number | string) =>
    new Promise((resolve, reject) => {
      db.Media.findOne({
        where: { id: userId },
        attributes: { exclude: ['password'] },
      })
        .then((data: any) => {
          resolve(data);
        })
        .catch((err: any) => {
          reject(err);
        });
    }),

  createOne: async (mediaData: any) =>
    new Promise((resolve, reject) => {
      let { medium, small, tiny } = mediaData;
      const { original } = mediaData;
      medium =
        medium !== undefined
          ? medium
          : original.replace(/\upload\//g, `upload/${mediumSize}/`);
      small =
        small !== undefined
          ? small
          : original.replace(/\upload\//g, `upload/${smallSize}/`);
      tiny =
        tiny !== undefined
          ? tiny
          : original.replace(/\upload\//g, `upload/${tinySize}/`);

      db.Media.create({ medium, small, tiny, original })
        .then((data: any) => {
          resolve(data);
        })
        .catch((err: any) => {
          reject(err);
        });
    }),
  modifyOne: (media: any, fields) =>
    new Promise((resolve, reject) => {
      media
        .update(fields)
        .then((data: any) => {
          resolve(data);
        })
        .catch((err: any) => {
          reject(err);
        });
    }),

  destroyOne: async (media: any, id) =>
    new Promise((resolve, reject) => {
      media
        .destroy({ where: { id } })
        .then((data: any) => {
          resolve(data);
        })
        .catch((err: any) => {
          reject(err);
        });
    }),

  getOneByUserId: async (userId: number | string) =>
    new Promise((resolve, reject) => {
      db.User.destroy({ where: { id: userId } })
        .then((data: any) => {
          resolve(data);
        })
        .catch((err: any) => {
          reject(err);
        });
    }),
  getAllByPostId: async (email: string) =>
    new Promise((resolve, reject) => {
      db.User.findOne({ where: { email } })
        .then((user) => {
          resolve(user);
        })
        .catch((err) => {
          reject(err);
        });
    }),
  getAllByAlbumId: async (userId: number | string, password: string) =>
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
