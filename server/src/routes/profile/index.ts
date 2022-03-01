import express from 'express';

// Custom imports
import * as schema from '../../schema/profile';
import profileController from '../../controllers/profile';
import validateResource from '../../middleware/validateResource';
import { profilesStorage } from '../../cloudinary';

const router = express.Router();

router.post(
  '/',
  validateResource(schema.createProfileSchema),
  profilesStorage.fields([
    { name: 'profilePicture', maxCount: 1 },
    { name: 'coverPicture', maxCount: 1 },
  ]),
  profileController.createOne
);

router
  .route('/:id')
  .get(profileController.getOne)
  .put(profileController.editOne)
  .delete(profileController.deleteOne);

export default router;
