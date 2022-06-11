import { BadRequest } from '@feathersjs/errors';

import { HookContext } from '@feathersjs/feathers';

export default (options) => (context: HookContext) => {
  const { data } = context;
  options.forEach((key) => {
    if (data[key]) {
      if (
        data[key] !== 'true' &&
        data[key] !== 'false' &&
        data[key] !== true &&
        data[key] !== false
      ) {
        throw new BadRequest('Wrong data provided');
      }

      // eslint-disable-next-line no-unneeded-ternary
      data[key] = data[key] === 'true' || data[key] === true ? true : false;
    }
  });

  return context;
};
