const Follow = require('../models/follow');
const User = require('../models/user');

const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');

exports.followUser = catchAsync(async (req, res, next) => {
  if (!req.body.from) req.body.from = req.user.id;
  if (!req.body.to) req.body.to = req.params.userId;

  if (req.body.from === req.body.to)
    return next(new AppError('You cannot follow yourself', 400));

  const existingFollow = await Follow.findOne({
    from: req.body.from,
    to: req.body.to,
  });

  if (existingFollow) {
    await Follow.deleteOne({ _id: existingFollow._id });
    const user = await User.findById(req.body.from)
      .populate('posts')
      .populate('comments')
      .populate('likes')
      .populate('followers')
      .populate('following');
    res.status(200).json({
      status: 'success',
      message: { user },
    });
    return;
  }

  await Follow.create(req.body);
  const user = await User.findById(req.body.from)
    .populate('posts')
    .populate('comments')
    .populate('likes')
    .populate('followers')
    .populate('following');

  res.status(200).json({
    status: 'success',
    data: { user },
  });
});
