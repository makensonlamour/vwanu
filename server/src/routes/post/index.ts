import config from 'config';
import express from 'express';

// Custom Imports
import * as Post from '../../controllers/post/post.controller';

// import { createPostSchema } from '../../schema/post';
import * as Schema from '../../schema/post';
import validateSchema from '../../middleware/validateResource';
import requireLogin from '../../middleware/requireLogin';

import { postStorage } from '../../cloudinary';

const router = express.Router();

router
  .route('/')
  .post(
    requireLogin,

    postStorage.fields([
      { name: 'postImage', maxCount: config.get<number>('maxPostImages') },
      { name: 'postVideo', maxCount: config.get<number>('maxPostVideos') },
      { name: 'postAudio', maxCount: config.get<number>('maxPostAudios') },
    ]),
    // validateSchema(createPostSchema),
    Post.createOne
  )
  .get(requireLogin, validateSchema(Schema.getAllPost), Post.getAll);
// @Todo  validation 
router.route('/:id').get(requireLogin, Post.getOne);

export default router;
