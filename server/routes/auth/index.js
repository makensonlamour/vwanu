const express = require('express')
const passport = require('passport')
const auth = require('../controllers/auth')

const router = express.Router()

router
  .route('/')
  .get(auth.loginForm)
  .post(passport.authenticate('local', {}), auth.login)

router.get('/logout', auth.logout)
router.get('/lock-screen', auth.lockScreen)
router.get('/forgot-password', auth.forgotPasswordForm)

module.exports = router
