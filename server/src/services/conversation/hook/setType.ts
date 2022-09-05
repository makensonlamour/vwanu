import { HookContext } from '@feathersjs/feathers';
import isNill from 'lodash/isNil';

export default (context: HookContext) => {
  if (!isNill(context.data.type)) return context;
  context.data.type = 'direct';
  return context;
};
