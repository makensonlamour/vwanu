import { z, object, string } from 'zod';


// eslint-disable-next-line import/prefer-default-export
const  ErrorCode= object({
  error_code: string(),
  error_message :string(),
  description:string(),

})

export type ErrorCodeInterface = z.infer<typeof ErrorCode>;