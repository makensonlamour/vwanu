import { z, object, string, TypeOf } from 'zod';

export const createUserSchema = object({
  body: object({
    firstName: string({
      required_error: 'Please provide a first name',
    }),
    lastName: string({
      required_error: 'Please provide a last name',
    }),
    email: string({
      required_error: 'You must provide a valid email address',
    }).email('The email address you provided is not a valid email'),
    password: string({
      required_error: 'You must provide a valid password',
    }).min(6, 'Password is too short - should be min 6 characters'),
    passwordConfirmation: string({
      required_error: 'Password confirmation is required',
    }),
  }).refine((data) => data.password === data.passwordConfirmation, {
    message: 'Passwords do not match',
    path: ['passwordConfirmation'],
  }),
  params: object({
    files: z.object({}).optional(),
  }),
});

export const UserSchema = z.object({
  id: z.number(),
  email: z.string(),
  password: string(),
  activationKey: z.string(),
  resetPasswordKey: string(),
  verified: z.boolean(),
});

export const UpUser = object({
  id: z.number(),
  username: z.string(),
  email: z.string(),
  password: string(),
  firstName: string(),
  lastName: string(),
  avatar: string(),
  profilePicture: string(),
  coverPicture: string(),
  backgroundImage: string(),
  backgroundImageStatus: z.boolean(),
  relationshipId: z.number(),
  address: string(),
  activationKey: z.string(),
  resetPasswordKey: string(),
  working: string(),
  workingLink: string(),
  about: string(),
  school: string(),
  gender: string(),
  birthday: string(),
  countryId: z.number(),
  website: string(),
  facebook: string(),
  google: string(),
  twitter: string(),
  linkedin: string(),
  youtube: string(),
  vk: string(),
  instagram: string(),
  qq: string(),
  wechat: string(),
  discord: string(),
  mailru: string(),
  language: string(),
  email_code: string(),
  src: string(),
  ip_address: string(),
  followPrivacy: z.boolean(),
  friendPrivacy: z.boolean(),
  postPrivacy: string(), // z.enum(['none', 'friend', 'friendsOfFriends']), // enum , I_follow , none, everyone
  messagePrivacy: z.string(), // enum , I_follow , none, everyone
  confirm_followers: z.boolean(),
  show_activitiesPrivacy: z.boolean(),
  birthPrivacy: z.boolean(),
  visitPrivacy: z.boolean(),
  verified: z.boolean(),
  lastSeenPrivacy: z.boolean(),
  showLastSeen: z.boolean(),
  emailNotification: z.boolean(),
  eLikedNotified: z.boolean(),
  eSharedNotified: z.boolean(),
  eCommentedNotified: z.boolean(),
  eFollowedNotified: z.boolean(),
  eAcceptedNotified: z.boolean(),
  eMentionedNotified: z.boolean(),
  eJoinedGroupNotified: z.boolean(),
  eLikedPageNotified: z.boolean(),
  eVisitedNotified: z.boolean(),
  eProfileWallPostNotified: z.boolean(),
  eMemoryNotified: z.boolean(),
  status: string(),
  active: z.boolean(),
  admin: z.boolean(),
  type: string(),
  registered: string(),
  startupImage: z.boolean(),
  last_email_sent: z.number(),
  phone_number: string(),
  sms_code: string(),
  is_pro: z.boolean(),
  pro_time: z.number(),
  pro_type: z.string(), // enum
  joined: z.number(),
  css_file: z.string(),
  timezone: z.string(),
  referrer: z.number(), // id of the referrer
  ref_user_id: z.number(), // id of the referrer
  balance: string(),
  paypal_email: string(),
  notifications_sound: z.boolean(),
  order_posts_by: z.boolean(),
  social_login: z.boolean(),
  android_m_device_id: string(),
  ios_m_device_id: string(),
  android_n_device_id: string(),
  ios_n_device_id: string(),
  web_device_id: string(),
  lat: string(),
  lng: string(),
  last_location_update: string(),
  post_count: z.number(),
  album_count: z.number(),
  following_count: z.number(),
  followers_count: z.number(),
  groups_count: z.number(),
  likes_count: z.number(),
  sidebar_data: string(),
  last_avatar_mod: z.number(),
  last_cover_mod: z.number(),
  points: z.number(),
  daily_points: z.number(),
  point_day_expire: z.number(),
  last_follow_id: z.number(),
  last_login_data: string(),
  two_factor: z.number(),
  new_email: string(),
  two_factor_verified: z.boolean(),
  new_phone: z.string(),
  city: string(),
  state: string(),
  zip: string(),
  school_completed: string(),
  weather_unit: string(),
  StripeSessionId: string(),
  country: string(),
  interestedBy: string(),
});
export const verifyUserSchema = object({
  params: object({
    id: string(),
    activationKey: string(),
  }),
});

export const getUserSchema = object({
  params: object({
    id: string(),
  }),
});

export const forgotPasswordSchema = object({
  body: object({
    email: string({
      required_error: 'Email is required',
    }).email('Not a valid email'),
  }),
});

export const resetPasswordSchema = object({
  params: object({
    id: string(),
    resetPasswordKey: string(),
  }),
  body: object({
    password: string({
      required_error: 'Password is required',
    }).min(6, 'Password is too short - should be min 6 chars'),
    passwordConfirmation: string({
      required_error: 'Password confirmation is required',
    }),
  }).refine((data) => data.password === data.passwordConfirmation, {
    message: 'Passwords do not match',
    path: ['passwordConfirmation'],
  }),
});
export type UserInterface = z.infer<typeof UserSchema>;
export type UpUserInterface = z.infer<typeof UpUser>;
export type GetUserInput = z.infer<typeof getUserSchema>['params'];
export type ResetPasswordInput = TypeOf<typeof resetPasswordSchema>;
export type CreateUserInput = TypeOf<typeof createUserSchema>;
export type VerifyUserInput = TypeOf<typeof verifyUserSchema>['params'];
export type ForgotPasswordInput = TypeOf<typeof forgotPasswordSchema>['body'];
