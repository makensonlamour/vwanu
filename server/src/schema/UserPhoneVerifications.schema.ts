import { z, object, string, number } from 'zod';


export const UserPhoneVerifications = object({
 
    user_id:string(),
    phone_id :string(),
    verification_code: z.number(),
    code_sent_time: z.string(),
    verified_time:string(),
    is_verified :z.boolean(),
    
});

export type UserPhoneVerificationsInterface = z.infer<typeof UserPhoneVerifications>;
