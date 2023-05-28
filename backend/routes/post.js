const express = require('express');
const comment = require('./comment');
const like = require('./like');

const router = express.Router();

const {
  createPost,
  getPost,
  getPosts,
  updatePost,
  deletePost,
  deleteByAdmin,
  uploadPostPhoto,
  resizePhoto,
} = require('../controllers/post');

const { protect, restrictTo } = require('../controllers/auth');

router.use('/:postId/comment', comment);
router.use('/:postId/like', like);

router.route('/').get(getPosts);
router.route('/:id').get(getPost);

router.use(protect);

router.route('/').post(uploadPostPhoto, resizePhoto, createPost);
router.route('/update/:id').patch(updatePost);
router.route('/delete/:id').delete(deletePost);

router.use(restrictTo('owner', 'admin'));

router.route('/deleteByAdmin').delete(deleteByAdmin);

module.exports = router;