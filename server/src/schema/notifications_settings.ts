import { z, object, string, number, TypeOf } from 'zod';

const validNotificationsNames = [
  'new_chat',
  'new_notification',
  'new_friend',
  'new_like',
  'new_comment',
  'new_follow',
  'new_comment_like',
  'new_comment_reply',
  'new_friend_request',
  'new_post_mention',
  'new_community_invitation',
  'new_blog_response',
];

export const createnotificationSettingsSchema = object({
  body: object({
    notification_name: string({
      required_error: 'Please provide notification name',
      invalid_type_error: 'Invalid notification name',
    }),
    notification_description: string({
      required_error: 'Please provide a last name',
      invalid_type_error: 'Invalid notification description',
    }),
  }).refine(
    (data) => validNotificationsNames.includes(data.notification_name),
    {
      message: 'Invalid notification setting  name',
      path: ['notification_name'],
    }
  ),
});

export const notificationSettingsSchema = object({
  id: number({
    required_error: 'Please provide the notification setting id',
    invalid_type_error: 'Invalid notification setting id',
  }),
  notification_name: string({
    required_error: 'Please provide notification name',
    invalid_type_error: 'Invalid notification name',
  }),
  notification_description: string({
    required_error: 'Please provide a last name',
    invalid_type_error: 'Invalid notification description',
  }),
});

/**
 * Represents the inferred type of the `notificationSettingsSchema`.
 * This type defines the structure of the notification settings.
 */
export type NotificationSettingsInterface = z.infer<
  typeof notificationSettingsSchema
>;
export type CreateNotificationSettingsInput = TypeOf<
  typeof createnotificationSettingsSchema
>;
