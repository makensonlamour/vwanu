import { Op } from '@sequelize/core';
import { HookContext } from '@feathersjs/feathers';

import notBanned from './notBanned.utils';
import isMemberOfCommunity from './isMemberOfCommunity.utils';

export default (context: HookContext, where: any) => {
  const { app, params } = context;
  const sequelize = app.get('sequelizeClient');

  const clause = {
    ...where,
    [Op.and]: [
      {
        [Op.or]: [
          { UserId: params?.User?.id },
          {
            [Op.and]: [
              { privacyType: 'public' },
              notBanned(params.User.id, context.id, sequelize),
            ],
          },
          {
            [Op.and]: [
              isMemberOfCommunity(params.User.id, context.id, sequelize),
            ],
          },
        ],
      },
    ],
  };
  return clause;
};
