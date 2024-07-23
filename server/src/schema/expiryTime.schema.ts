import { z, object, string, number } from 'zod';


export const expiryTime = object({
    request_type: string() ,
    expiry_duration_minutes :number()
});

export type ExpiryTimeInterface = z.infer<typeof expiryTime>;
