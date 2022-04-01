import express from 'express';

/** Local dependencies */
import common from '../../lib/utils/common';
import { postStorage } from '../../cloudinary';
import requireLogin from '../../middleware/requireLogin';
import validateSchema from '../../middleware/validateResource';
import * as CommentController from '../../controllers/comment/comment.controller';
import {
  createCommentSchema,
  getAllComment,
  editCommentSchema,
  getOnePostSchema,
} from '../../schema/post';

const router = express.Router();
router.use(requireLogin);

router
  .route('/')
  .post(
    postStorage.fields(common.profileMediaOptions),
    validateSchema(createCommentSchema),
    CommentController.createOne
  )
  .get(validateSchema(getAllComment), CommentController.getAll);

router
  .route('/:id')
  .get(validateSchema(getOnePostSchema), CommentController.getOne)
  .put(validateSchema(editCommentSchema), CommentController.editOne)
  .delete(validateSchema(getOnePostSchema), CommentController.deleteOne);

export default router;
