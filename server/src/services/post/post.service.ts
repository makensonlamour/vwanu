import db from '../../models';

const DataProvider = {
  createOne: async (postData: any, option?: any) =>
    new Promise((resolve, reject) => {
      db.Post.create(postData, option)
        .then((data: any) => {
          resolve(data);
        })
        .catch((err: any) => {
          reject(err);
        });
    }),
  findOne: async (id: number) =>
    new Promise((resolve, reject) => {
      db.Post.findOne({ where: { id } })
        .then((post: any) => resolve(post))
        .catch((err: any) => {
          reject(err(err));
        });
    }),
};

export default DataProvider;
