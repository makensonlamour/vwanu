import { z, string, TypeOf, object } from 'zod';

const vias = z.enum([
  'mail',
  'sms',
  'mobilePushNotification',
  'webPushNotification',
]);

export const notifierOptions = object({
  via: vias,
  link: string(),
});
export type viaType = TypeOf<typeof vias>;
export type NotifierOptions = TypeOf<typeof notifierOptions>;
