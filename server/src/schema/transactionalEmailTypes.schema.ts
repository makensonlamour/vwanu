import { z } from 'zod';

export const EmailsTypes = z.enum([
  'resetPwd',
  'verifySignup',
  'sendResetPwd',
  'passwordChange',
  'identityChange',
  'resendVerifySignup',
]);
export const EmailsList = z.enum([
  'resetPwd',
  'VerifySignup',
  'sendResetPwd',
  'passwordChange',
  'identityChange',
  'activationConfirmation',
]);

export type TR_EMAILS_LIST = z.infer<typeof EmailsList>;
export type TR_EMAILS_TYPES = z.infer<typeof EmailsTypes>;
