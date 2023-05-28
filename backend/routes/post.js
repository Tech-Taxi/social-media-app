const express = require('express');

const router = express.Router();

const {
  createPost,
  getPost,
  getPosts,
  updatePost,
  deletePost,
  deleteByAdmin,
} = require('../controllers/post');
const { protect, restrictTo } = require('../controllers/auth');

router.route('/').get(getPosts);
router.route('/:id').get(getPost);

router.use(protect);

router.route('/').post(createPost);
router.route('/update/:id').patch(updatePost);
router.route('/delete/:id').delete(deletePost);

router.use(restrictTo('owner', 'admin'));

router.route('/deleteByAdmin').delete(deleteByAdmin);

module.exports=router;