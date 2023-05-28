const Like = require('../models/like');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');

exports.createLike = catchAsync(async (req, res, next) => {
  if (!req.body.author) req.body.user = req.user.id;
  if (!req.body.post) req.body.post = req.params.postId;

  // console.log(req.body)

  const like = await Like.create(req.body);
  res.status(201).json({
    status: 'success',
    data: like,
  });
});

exports.getLikes = catchAsync(async (req, res, next) => {
  const likes = await Like.find({ post: req.params.postId });
  res.status(200).json({
    status: 'success',
    data: likes,
    count: likes.length,
  });
});

exports.deleteLike = catchAsync(async (req, res, next) => {
  const like = await Like.findById(req.params.id);

  if (!like) return next(new AppError('No such like exists', 404));
  if (like.user.toString() !== req.user.id)
    return next(new AppError('You cannot delete that like', 401));

  await Like.findByIdAndDelete(like._id);

  res.status(204).json({
    status: 'success',
    data: null,
  });
});