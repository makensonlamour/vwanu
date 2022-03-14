import express from 'express';

// Custom Imports
import * as Post from '../../controllers/post';
import { createPostSchema } from '../../schema/post';
import validateSchema from '../../middleware/validateResource';
import requireLogin from '../../middleware/requireLogin';

const router = express.Router();

router
  .route('/')
  .post(requireLogin, validateSchema(createPostSchema), Post.createOne);

export default router;
