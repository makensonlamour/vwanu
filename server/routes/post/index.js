import express from 'express'

const router = express.Router()

// Custom dependencies
const Post = {}

// Routes definitions
router.route('/:id').get(Post.getOne).put(Post.editOne).delete(Post.deleteOne)

router.route('/').post(Post.createOne).get(Post.getAll)
router.get('/timeline', Post.getTimeline)

module.exports = router
