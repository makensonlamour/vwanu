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

  findMany: async (criteria: any, option?: any) =>
    new Promise((resolve, reject) => {
      db.Post.findAndCountAll({ where: criteria, ...option })
        .then((posts: any[]) => resolve(posts))
        .catch((err: any) => {
          console.log('We have some err');
          console.log(err);
          reject(err(err));
        });
    }),
};

export default DataProvider;
