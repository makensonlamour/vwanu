import { z, object, string } from 'zod';

export const EmailTemplateSchema = object({
  id: z.number(),
  subject: z.string(),
  body: z.string(),
});

export const getEmailTemplateSchema = object({
  params: object({
    id: string(),
  }),
});

export type getEmailTemplateInput = z.infer<
  typeof getEmailTemplateSchema
>['params'];

export type EmailTemplateInterface = z.infer<typeof EmailTemplateSchema>;
