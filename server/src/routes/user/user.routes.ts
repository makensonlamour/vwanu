import express from 'express';

// Custom imports
import User from '../../controllers/user';
import FriendController from '../../controllers/friend/friend.controller';
import * as schema from '../../schema/user';
// import isSelf from '../../middleware/isSelf';
import requireLogin from '../../middleware/requireLogin';
import validateResource from '../../middleware/validateResource';
import { profilesStorage } from '../../cloudinary';

const router = express.Router();

router
  .route('/')
  .post(
    validateResource(schema.createUserSchema),
    profilesStorage.fields([
      { name: 'profilePicture', maxCount: 1 },
      { name: 'coverPicture', maxCount: 1 },
    ]),
    User.createOne
  )
  .get(requireLogin, User.getProfile);
router.route('/timeline').get(requireLogin, User.getTimeline);
router.post(
  '/verify/:id/:activationKey',
  requireLogin,
  validateResource(schema.verifyUserSchema),
  User.verifyOne
);

router.post(
  '/forgotPassword',
  validateResource(schema.forgotPasswordSchema),
  User.forgotPassword
);
router.post(
  '/resetPassword/:id/:resetPasswordKey',
  validateResource(schema.resetPasswordSchema),
  User.resetPassword
);

router
  .route('/follow')
  .post(requireLogin, User.addFollower)
  .get(requireLogin, User.getFollowers)
  .delete(requireLogin, User.removeFollower);
router
  .route('/request')
  .post(requireLogin, User.addFriendRequest)
  .get(requireLogin, User.getFriendsRequest)
  .delete(requireLogin, User.removeFriendsRequest);
router
  .route('/friend')
  .post(requireLogin, FriendController.addFriend)
  .get(requireLogin, FriendController.getFriends)
  .delete(requireLogin, FriendController.removeFriend);

router
  .route('/:id')
  .put(
    profilesStorage.fields([
      { name: 'profilePicture', maxCount: 1 },
      { name: 'coverPicture', maxCount: 1 },
    ]),
    User.updateOne
  )
  .get(
    // validateResource(schema.getUserSchema),
    requireLogin,
    User.getOne
  );
export default router;
