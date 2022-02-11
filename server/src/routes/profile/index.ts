import express from 'express'

import profileController from '../../controllers/profile'
const router = express.Router()

router.post('/', profileController.createOne)

router
  .route('/:id')
  .get(profileController.getOne)
  .put(profileController.editOne)
  .delete(profileController.deleteOne)
  
export default router
