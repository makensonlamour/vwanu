import db from '../../models';
import { CreatePostInput } from '../../schema/post';

const DataProvider = {
  createOne: async (postData: Partial<CreatePostInput>) =>
    new Promise((resolve, reject) => {
      db.Post.create(postData)
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
