import { HookContext } from '@feathersjs/feathers';

import { Application } from '../../../declarations';
import notifier from '../../../lib/utils/messenger';

export type sendVerificationCode = {
    successMessage: string
}

/**
 * Music to dowload. 
 * Elvis martinez 
 * Banda Real 
 * 
 */
export default ({ successMessage }: sendVerificationCode) => async (context: HookContext): Promise<HookContext> => {
    const { data, app } = context;

    if (!context.result.verificationcode)
        return context;

    await notifier(app as Application)
        .notifier('PHN_VER_COD', { phoneNumber: data?.phoneNumber, verificationCode: context.result.verificationCode }, { source: 'sms' })

    context.result = { message: successMessage }
    context.dispatch = { message: successMessage }




    return context;
};