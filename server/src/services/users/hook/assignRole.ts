/* eslint-disable no-underscore-dangle */
import { HookContext } from '@feathersjs/feathers';

export default (role: string = 'member') => async (context: HookContext): Promise<HookContext> => {
    try {
        const memBerRole = await context.app.service('CommunityRoles')._find({ where: { name: role } });
        context.data.access_role = memBerRole[0].id;
    } catch (error) {
        throw new Error(error);
    }

    return context;
}