import { z, object, string, TypeOf } from 'zod';


export const phone = object({
  id: z.string(),
  phone_number: z.string(),
  // phone_type:z.string(), the phone type is not necesarry 
  country_code :z.string()
});

export type PhoneInterface = z.infer<typeof phone>;
