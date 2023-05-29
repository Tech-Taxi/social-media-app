const Follow = require('../models/follow');
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
    res.status(200).json({
      status: 'success',
      message: 'Unfollowed user successfully',
    });
    return;
  }

  const follow = await Follow.create(req.body);
  res.status(200).json({
    status: 'success',
    data: follow,
  });

});
