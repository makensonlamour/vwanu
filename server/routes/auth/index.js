import express from 'express'
import passport from 'passport'
import { body } from 'express-validator'

// Custom dependencies 
import auth from '../../controllers/auth/index.js'
import handleRequestError from '../../middleware/HandleRequestErrors/index.js'

const router = express.Router()

router
  .route('/')
  .post(
    body('email').isEmail(),
    body('password').isLength({ min: 5 }),
    handleRequestError,
    passport.authenticate('local', { session: false }),
    auth.authenticate
  )

// router.get('/logout', auth.logout)
// router.get('/lock-screen', auth.lockScreen)
// router.get('/forgot-password', auth.forgotPasswordForm)

export default router
