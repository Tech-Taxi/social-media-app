const express = require('express');

const {followUser} = require('../controllers/follow')
const {protect} = require('../controllers/auth')

const router = express.Router({mergeParams: true});


router.use(protect)

router.route('/').post(followUser)

module.exports = router;