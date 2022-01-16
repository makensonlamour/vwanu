import express from 'express'
import { body, checkSchema } from 'express-validator'

import User from '../../controllers/user/index.js'
import handleRequestError from '../../middleware/HandleRequestErrors/index.js'

const router = express.Router()

const checkGetOne = {
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
  .get(checkSchema(checkGetOne), handleRequestError, User.getOne)


export default router
