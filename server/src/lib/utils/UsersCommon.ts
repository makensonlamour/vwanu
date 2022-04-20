import { Op } from '@sequelize/core';
import db from '../../models';
import { userAttributes } from './commentPostInclude';

export const getRequesterAndRequest = async (requesterId, requestId, include) =>
  new Promise((resolve, reject) => {
    db.User.findAll({
      where: { id: { [Op.or]: [requesterId, requestId] } },
      attributes: userAttributes,
      include,
    })
      .then((people) => {
        const requester = people.find(
          (person) => person.id.toString() === requesterId
        );

        const request = people.find(
          (person) => person.id.toString() === requestId
        );
        if (!requester || !request) reject();
        resolve({requester , request});
      })
      .catch((err) => reject(err));
  });

export const v = 1;
