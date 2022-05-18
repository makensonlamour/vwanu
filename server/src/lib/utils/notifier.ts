const sanitizeUserForNotifier = require('./sanitize-user-for-notifier');

export default async (optionsNotifier, type, user, notifierOptions) => {
  await optionsNotifier(
    type,
    sanitizeUserForNotifier(user),
    notifierOptions || {}
  );
  return user;
};
