const router = require('express').Router()

// Custom dependencies
const Post = require('../../controllers/post')

router.route('/').post(Post.createOne)

router
  .route('/:id')
  .get(Post.getOne)
  .put(Post.editOne)
  .delete(Post.deleteOne)

router.get('/timeline', Post.getTimeline)

module.exports = router
