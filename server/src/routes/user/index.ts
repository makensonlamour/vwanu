import express from 'express'
import { body, checkSchema, Schema } from 'express-validator'

// Custom imports
import User from '../../controllers/user'
import isSelf from '../../middleware/isSelf'
import requireLogin from '../../middleware/requireLogin'
import handleRequestError from '../../middleware/HandleRequestErrors'

import {
  createUserSchema,
  getUserSchema,
  resetPasswordSchema,
  verifyUserSchema,
  forgotPasswordSchema,
} from '../../schema/user'
import validateResource from '../../middleware/validateResource'

const router = express.Router()

const checkGetOne: Schema = {
  id: {
    in: ['params'],
    errorMessage: 'bad id format or missing',
    isInt: true,
  },
}
router
  .route('/')
  .post(
    validateResource(createUserSchema),
    body('email').isEmail(),
    body('password').isLength({ min: 5 }),
    handleRequestError,
    User.createOne
  )
router
  .route('/:id')
  .get(
    validateResource(getUserSchema),
    checkSchema(checkGetOne),
    handleRequestError,
    requireLogin,
    isSelf,
    User.getOne
  )
router.post(
  '/verify/:id/:activationKey',
  validateResource(verifyUserSchema),
  User.verifyOne
)

router.post(
  '/forgotPassword',
  validateResource(forgotPasswordSchema),
  User.forgotPassword
)
router.post(
  '/resetPassword/:id/:resetPasswordKey',
  validateResource(resetPasswordSchema),
  User.resetPassword
)

export default router
