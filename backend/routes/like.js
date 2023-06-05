const express = require('express');

const router = express.Router({mergeParams: true});


const {
  createLike,
  getLikes,
  
} = require('../controllers/like');
const { protect } = require('../controllers/auth');

router.route('/').get(getLikes);

router.use(protect);

router.route('/').post(createLike);

module.exports=router;