const express = require('express');
const passport = require('passport');

const follow = require('./follow')
const {
  getUsers,
  updateMe,
  deleteMe,
  getMe,
  getUser,
  uploadUserPhoto,
  resizePhoto,
} = require('../controllers/user');
const {
  register,
  login,
  protect,
  restrictTo,
  forgotPassword,
  resetPassword,
  updatePassword,
  logout,
  googleSuccess,
  isLoggedIn,
} = require('../controllers/auth');

require('../controllers/googleAuth');

const router = express.Router();

router.use('/user/:userId/follow', follow)

router.route('/isLoggedIn').post(isLoggedIn)
router.route('/register').post(register);
router.route('/login').post(login);
router.route('/logout').get(logout);
router.route('/user/:id').get(getUser);

// Google authentication
router.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['email', 'profile'] }),
);

router.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  googleSuccess,
);


router.route('/').get(getUsers);
router.route('/forgotPassword').post(forgotPassword);
router.route('/resetPassword/:token').patch(resetPassword);

router.use(protect);

router.route('/updatePassword').patch(updatePassword);
router.route('/me').get(getMe, getUser);
router.route('/updateMe').patch(uploadUserPhoto, resizePhoto, updateMe);
router.route('/deleteMe').delete(deleteMe);

// router.use(restrictTo('owner', 'admin'));


module.exports = router;
