import { HookContext } from '@feathersjs/feathers';

import isNil from 'lodash/isNil';

export default (options: any) => (context: HookContext) => {
  const { data, params } = context;

  Object.keys(options).forEach((key) => {
    data[key] = !isNil(options[key]) ? options[key] : params.User.id;
  });
  return context;
};
