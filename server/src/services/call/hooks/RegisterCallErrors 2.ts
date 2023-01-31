import { HookContext } from '@feathersjs/feathers';
import Logger from '../../../lib/utils/logger';

export default (context: HookContext): HookContext => {
  Logger.error(context.error);
  return context;
};
