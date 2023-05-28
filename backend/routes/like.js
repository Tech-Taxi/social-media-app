const express = require('express');

const router = express.Router({mergeParams: true});


const {
  createLike,
  getLikes,
  deleteLike,
} = require('../controllers/like');
const { protect, restrictTo } = require('../controllers/auth');

router.route('/').get(getLikes);

router.use(protect);

router.route('/').post(createLike);
router.route('/:id').delete(deleteLike);

module.exports=router;