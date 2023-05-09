import { z } from 'zod';

const Template = z.object({
  body: z.string(),
  subject: z.string(),
  type: z.enum(['sms', 'email']),
  snug: z.string(),
});

export default Template;
export type MsgTemplate = z.infer<typeof Template>;
