import express from 'express'
import { body, checkSchema, Schema } from 'express-validator'

import User from '../../controllers/user'
import handleRequestError from '../../middleware/HandleRequestErrors'
import isSelf from '../../middleware/isSelf'
import requireLogin from '../../middleware/requireLogin'

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
    body('email').isEmail(),
    body('password').isLength({ min: 5 }),
    handleRequestError,
    User.createOne
  )
router
  .route('/:id')
  .get(
    checkSchema(checkGetOne),
    handleRequestError,
    requireLogin,
    isSelf,
    User.getOne
  )

export default router
