//Define all path routes

let routesPath = {
  NOTFOUND: "*",
  LOGIN: "/login",
  REGISTER: "/register",
  LOGOUT: "/login",
  FORGOT_PASSWORD: "/forgot-password",
  FORGOT_PASSWORD_SUCCESS: "/forgot-password-success",
  VERIFY_EMAIL: "/verify-email/:id/:activationKey",
  RESET_PASSWORD: "/reset-password/:idUser/:resetPasswordKey",
  NEWSFEED: "/",
  STEP_ONE: "/profile/step-one",
  STEP_TWO: "/profile/step-two",
  STEP_THREE: "/profile/step-three",
  STEP_FOUR: "/profile/step-four",
  ALBUMS: "/albums",
  SAVED_POST: "/bookmarks",
  INTEREST: "/interest",
  FORUMS: "/forums",
  VIEW_FORUMS: "/forums/:categoryId/:id",
  VIEW_LIST_FORUMS: "/forums/:categoryId",
  MY_INTERESTS: "/myinterest",
  MESSAGE: "/messages",
  VIEW_MESSAGE: "/messages/:id",
  MY_GROUPS: "/mygroups",
  GROUPS: "/groups",
  VIEW_GROUPS: "/groups/:id/*",
  ADD_GROUPS: "/groups/add",
  MY_PAGES: "/mypages",
  BLOG: "/blogs",
  VIEW_BLOG: "/blogs/:id/*",
  ADD_BLOG: "/blogs/add",
  PROFILE: "/profile/:id/*",
  POST: "/post/:id",
  POST_PREVIEW: "/post/preview",
  PROFILE_EDIT: "/me/profile/edit",
  MEMBERS: "/members",
  FRIENDS: "/friends/",
  FRIENDS_REQUESTS: "/friends?requests",
  PRIVACY_SETTINGS: "/privacy-settings",
  GENERAL_SETTINGS: "/general-settings",
  VOICE_CALL: "/call",
  VIDEO_CALL: "/general-settings",
  NOTIFICATIONS: "/notifications",
  TEST_PAGE: "/test",
};

export default routesPath;
