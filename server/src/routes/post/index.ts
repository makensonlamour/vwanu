
import config from 'config';

import express from 'express';

// Custom Imports
import * as Post from '../../controllers/post';
import { createPostSchema } from '../../schema/post';
import validateSchema from '../../middleware/validateResource';
import requireLogin from '../../middleware/requireLogin';

import { postStorage } from '../../cloudinary';

const router = express.Router();

router.route('/').post(
  requireLogin,
  validateSchema(createPostSchema),
  postStorage.fields([
    { name: 'postImage', maxCount: config.get<number>('maxPostImages') },
    { name: 'postVideo', maxCount: config.get<number>('maxPostVideos') },
    { name: 'postAudio', maxCount: config.get<number>('maxPostAudios') },
  ]),
  Post.createOne
);


export default router;
