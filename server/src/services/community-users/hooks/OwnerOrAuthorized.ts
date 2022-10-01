import { HookContext } from '@feathersjs/feathers';
import Authorized from './OnlyAuthorized';

export default async (context: HookContext): Promise<HookContext> =>
  Authorized(context);
