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

export type NotifierOptions={
  source: 'email'| 'sms'
}
const Messenger = z.object({
  send: z
    .function()
    .args(z.string(), z.string(), z.string())
    .returns(z.promise(z.object({ ok: z.boolean() }))),
  sendTemplate: z
    .function()
    .args(z.string(), z.string(), z.any())
    .returns(z.promise(z.object({ ok: z.boolean() }))),
});
export type IMessenger = z.infer<typeof Messenger>;
export type SendEmailType = z.infer<typeof SendEmail>;
export type SendEmailTemplateType = z.infer<typeof SendEmailTemplate>;
