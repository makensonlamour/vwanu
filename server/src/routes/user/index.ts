import express from 'express';

// Custom imports
import User from '../../controllers/user';
import * as schema from '../../schema/user';
import isSelf from '../../middleware/isSelf';
import requireLogin from '../../middleware/requireLogin';
import validateResource from '../../middleware/validateResource';

const router = express.Router();

router
  .route('/')
  .post(validateResource(schema.createUserSchema), User.createOne);
router
  .route('/:id')
  .get(
    validateResource(schema.getUserSchema),
    requireLogin,
    isSelf,
    User.getOne
  );
router.post(
  '/verify/:id/:activationKey',
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

export default router;
