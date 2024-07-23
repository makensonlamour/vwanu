import { z, string, TypeOf, object } from 'zod';

export const TemplateMessage = object({
  snug: z.string(),
  template_body: string(),
  required_fields: z.any(),
});
export type TemplateMessageInterface = TypeOf<typeof TemplateMessage>;