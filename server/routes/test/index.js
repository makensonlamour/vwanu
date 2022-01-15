import * as controller from '../../controllers/test/index.js'

import express from 'express'
const router = express.Router()

router.route('/').get(controller.getAll).post(controller.createOne)

export default router
