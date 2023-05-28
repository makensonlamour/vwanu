import { z, object, string } from 'zod';

export const MessageTemplateSchema = object({
  id: z.string(),
  snug: z.string(),
  type: z.string(),
});

export const getEmailTemplateSchema = object({
  params: object({
    id: string(),
  }),
});
export const getEmailTemplateSchemaByName = object({
  params: object({
    snug: string(),
  }),
});

export type getEmailTemplateInput = z.infer<
  typeof getEmailTemplateSchema
>['params'];

export type MessageTemplateInterface = z.infer<typeof MessageTemplateSchema>;
