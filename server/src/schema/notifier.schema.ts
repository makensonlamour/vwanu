import { z } from 'zod';
// import isNill from 'lodash/isNil';

const mustHave = ['email', 'phone'];

export const User = z
  .object({
    phone: z.string().optional(),
    email: z.string().email().optional(),
  })
  .refine(
    (data) =>
      mustHave.some((item) => Object.prototype.hasOwnProperty.call(data, item)),
    {
      message: `Please pass at least either User's${mustHave.join(' or ')}`,
    }
  );

type NotifierOptions = {
  channel: 'email' | 'sms';
  user: z.infer<typeof User>;
  message: {
    subject: string;
    body: string;
  };
};

export default NotifierOptions;
