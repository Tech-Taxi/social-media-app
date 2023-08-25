const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');
const User = require('../models/user');
const Email = require('../utils/email');

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const sendToken = (user, status, res) => {
  const token = signToken(user._id);
  user.password = undefined;
  let cookieOptions = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000,
    ),
    httpOnly: true,
  };
  if (process.env.NODE_ENV === 'PRODUCTION') cookieOptions.secure = true;
  res.cookie('jwt', token, cookieOptions);

  res.status(status).json({
    status: 'success',
    token,
    user,
  });
};

exports.register = catchAsync(async (req, res, next) => {
  req.body.photo = null;
  const user = await User.create(req.body);

  const url = `${req.protocol}://${req.get('host')}/api/v1/users/me`;
  await new Email(user, url).sendWelcome();

  sendToken(user, 201, res);
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password)
    return next(new AppError('Email and Password required', 400));

  const user = await User.findOne({ email })
    .populate('followers')
    .populate('following')
    .populate('posts')
    .populate('likes')
    .select('+password');
  if (!user || !(await user.correctPassword(password, user.password)))
    return next(new AppError('Incorrect email or password entered', 401));

  if (user.googleLogin)
    return next(new AppError('You registered using a Google account', 401));

  sendToken(user, 200, res);
});

exports.logout = (req, res) => {
  res.cookie('jwt', '', {
    expires: new Date(Date.now() + 10 * 1000),
  });
  res.status(200).json({
    status: 'success',
  });
};

exports.protect = catchAsync(async (req, res, next) => {
  let token;

  if (req.cookies.jwt) token = req.cookies.jwt;

  if (!token)
    return next(
      new AppError('You are not logged in. Please log in to continue', 401),
    );

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_KEY);
  const user = await User.findById(decoded.id).select('+role');
  if (!user) return next(new AppError('User no longer exists', 401));
  if (user.changedPasswordAfter(decoded.iat))
    return next(
      new AppError('User has changed password. Please log in again.', 401),
    );

  req.user = user;
  next();
});

exports.isLoggedIn = async (req, res, next) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    )
      token = req.headers.authorization.split(' ')[1];
    else if (req.cookies.jwt) token = req.cookies.jwt;

    if (!token)
      return res
        .status(200)
        .json({ status: 'fail', message: 'User is not logged in' });

    const decoded = await promisify(jwt.verify)(token, process.env.JWT_KEY);

    const user = await User.findById(decoded.id);
    if (!user)
      return res
        .status(200)
        .json({ status: 'fail', message: 'User is not logged in' });
    if (user.changedPasswordAfter(decoded.iat))
      return res
        .status(200)
        .json({ status: 'fail', message: 'User is not logged in' });

    res.locals.user = user;
    return res
      .status(200)
      .json({ status: 'success', message: 'User is logged in' });
  } catch (err) {
    return res
      .status(200)
      .json({ status: 'fail', message: 'User is not logged in' });
  }
};

exports.restrictTo =
  (...roles) =>
  (req, res, next) => {
    if (!roles.includes(req.user.role))
      return next(
        new AppError(
          'You do not have necessary permission to perform that action',
          403,
        ),
      );
    next();
  };

exports.forgotPassword = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) next(new AppError('No user exists with that email address', 404));

  const token = user.createResetToken();
  await user.save({ validateBeforeSave: false });

  const resetURL = `${req.protocol}://${req.get(
    'host',
  )}/api/v1/users/resetPassword/${token}`;

  try {
    await new Email(user, resetURL).sendReset();
    return res.status(200).json({
      status: 'success',
      message: 'Password reset token sent to email',
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.resetTokenExpiresIn = undefined;
    user.save({ validateBeforeSave: false });
    console.error(err);

    return next(
      new AppError(
        'There was an error sending the email. Try again later.',
        500,
      ),
    );
  }

});

exports.resetPassword = catchAsync(async (req, res, next) => {
  const hashedToken = crypto
    .createHash('sha512')
    .digest(req.params.token)
    .toString('hex');

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    resetTokenExpiresIn: { $gt: Date.now() },
  });

  if (!user) return next(new AppError('Token invalid or expired', 400));

  user.password = req.body.password;
  user.confirmPassword = req.body.confirmPassword;
  user.passwordResetToken = undefined;
  user.resetTokenExpiresIn = undefined;
  await user.save();

  sendToken(user, 200, res);
});

exports.updatePassword = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id).select('+password');
  if (!user.correctPassword(req.body.password, user.password))
    next(new AppError('Incorrect password entered', 401));

  user.password = req.body.newPassword;
  user.confirmPassword = req.body.confirmNewPassword;

  const currUser = await user.save();

  sendToken(currUser, 200, res);
});

exports.googleSuccess = (req, res) => {
  sendToken(req.user, 200, res);
};
