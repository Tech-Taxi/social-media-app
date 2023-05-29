const express = require('express');

const {followUser} = require('../controllers/follow')
const {protect} = require('../controllers/auth')

const router = express.Router({mergeParams: true});

// /api/v1/users/:userId/follow

router.use(protect)

router.route('/').post(followUser)

module.exports = router;