import { object, string, number, z } from 'zod';

const conf = object({
  host: string(),
  port: number().or(z.string().regex(/\d+/).transform(Number)),
  email_from: string(),
  auth: object({
    user: string(),
    pass: string(),
  }),
});

export default conf;
export type SMTP_CONFIGURATION = z.infer<typeof conf>;
