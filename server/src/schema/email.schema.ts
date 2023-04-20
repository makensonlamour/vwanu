import { z, string } from 'zod';

export const SendEmail = z.object({
  to: string(),
  subject: string(),
  html: string(),
});

export const SendEmailTemplate = z.object({
  to: string(),
  subject: string(),
  templateId: string(),
  personalizations: z.array(
    z.object({
      dynamic_template_data: z.any(),
    })
  ),
});
export type SendEmailType = z.infer<typeof SendEmail>;
export type SendEmailTemplateType = z.infer<typeof SendEmailTemplate>;
