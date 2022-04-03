import express from 'express';
/** Global dependencies */
import * as Schema from '../../schema/reaction.schema';
import requireLogin from '../../middleware/requireLogin';
import ReactionController from '../../controllers/reaction';
import validateResource from '../../middleware/validateResource';

const router = express.Router();
router.use(requireLogin);

router
  .route('/')
  .post(
    validateResource(Schema.createPostReactionSchema),
    ReactionController.createOne
  );
// .get(
//   validateResource(Schema.getAllReactionSchema),
//   ReactionController.getAll
// );

router
  .route('/:id')
  .get(validateResource(Schema.getReactionSchema), ReactionController.getOne)
  .put(validateResource(Schema.editReactionSchema), ReactionController.editOne)
  .delete(
    validateResource(Schema.getReactionSchema),
    ReactionController.deleteOne
  );

export default router;
