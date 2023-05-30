const express = require('express');
const comment = require('./comment');
const like = require('./like');

const router = express.Router();

const {
  createStory,
  getStory,
  getStorys,
  updateStory,
  deleteStory,
  deleteByAdmin,
  uploadStoryPhoto,
  resizePhoto,
} = require('../controllers/story');

const { protect, restrictTo } = require('../controllers/auth');

router.use('/:storyId/comment', comment);
router.use('/:storyId/like', like);

router.route('/').get(getStorys);
router.route('/:id').get(getStory);

router.use(protect);

router.route('/').post(uploadStoryPhoto, resizePhoto, createStory);
router.route('/update/:id').patch(updateStory);
router.route('/delete/:id').delete(deleteStory);

router.use(restrictTo('owner', 'admin'));

router.route('/deleteByAdmin').delete(deleteByAdmin);

module.exports = router;