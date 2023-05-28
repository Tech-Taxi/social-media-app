const express = require('express');

const router = express.Router({mergeParams: true});


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
router.route('/update/:id').patch(updateComment);
router.route('/delete/:id').delete(deleteComment);

router.use(restrictTo('owner', 'admin'));

router.route('/deleteByAdmin').delete(deleteByAdmin);

module.exports=router;