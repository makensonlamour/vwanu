import db from '../../models';

const DataProvider = {
  createOne: async (reactionData: any, option?: any) =>
    new Promise((resolve, reject) => {
      db.Reaction.create(reactionData, option)
        .then((data: any) => {
          resolve(data);
        })
        .catch((err: any) => {
          reject(err);
        });
    }),

  editOne: async (reaction: any, fields: any, option?: any) =>
    new Promise((resolve, reject) => {
      reaction
        .update(fields, option)
        .then((data: any) => {
          resolve(data);
        })
        .catch((err: any) => {
          reject(err);
        });
    }),

  deleteOne: async (reaction: any) =>
    new Promise((resolve, reject) => {
      reaction
        .destroy()
        .then((data: any) => {
          resolve(data);
        })
        .catch((err: any) => {
          reject(err);
        });
    }),
  findOne: async (id: number, option?: any) =>
    new Promise((resolve, reject) => {
      db.Reaction.findOne({ where: { id }, ...option })
        .then((Reaction: any) => resolve(Reaction))
        .catch((err: any) => {
          reject(err);
        });
    }),

  findMany: async (criteria: any, option?: any) =>
    new Promise((resolve, reject) => {
      db.Reaction.findAndCountAll({ where: criteria, ...option })
        .then((Reactions: any[]) => resolve(Reactions))
        .catch((err: any) => {
          reject(err);
        });
    }),
};

export default DataProvider;
