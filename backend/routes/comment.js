const express = require('express');

const router = express.Router();

const {
  createComment,
  getComments,
  updateComment,
  deleteComment,
  deleteByAdmin,
} = require('../controllers/comment');
const { protect, restrictTo } = require('../controllers/auth');

router.route('/').get(getComments);

router.use(protect);

router.route('/').post(createComment);
router.route('/update/:id').post(updateComment);
router.route('/delete/:id').post(deleteComment);

router.use(restrictTo('owner', 'admin'));

router.route('/deleteByAdmin').post(deleteByAdmin);
