const Comment = require('../models/comment');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');

exports.createComment = catchAsync(async (req, res, next) => {
  if (!req.body.author) req.body.author = req.user.id;
  if (!req.body.post) req.body.post = req.params.postId;

  const comment = await Comment.create(req.body);
  res.status(201).json({
    status: 'success',
    data: comment,
  });
});

exports.getComments = catchAsync(async (req, res, next) => {
  const comments = await Comment.find({ post: req.params.postId });
  res.status(200).json({
    status: 'success',
    data: comments,
    count: comments.length,
  });
});

exports.updateComment = catchAsync(async (req, res, next) => {
  const comment = await Comment.findById(req.params.id);

  if (!comment) return next(new AppError('No such comment exists', 404));
  if (comment.author.toString() !== req.user.id)
    return next(new AppError('You cannot update that comment', 401));

  if (!req.body.author) req.body.author = req.user.id;
  if (!req.body.post) req.body.post = req.params.postId;

  const freshComment = await Comment.findByIdAndUpdate(comment._id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: 'success',
    data: freshComment,
  });
});


exports.deleteComment = catchAsync(async (req, res, next) => {
  const comment = await Comment.findById(req.params.id);

  if (!comment) return next(new AppError('No such comment exists', 404));
  if (comment.author.toString() !== req.user.id)
    return next(new AppError('You cannot delete that comment', 401));

  await Comment.findByIdAndDelete(comment._id);

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

exports.deleteByAdmin = catchAsync(async (req, res, next) => {
  const comment = await Comment.findByIdAndDelete(req.params.id, {
    returnOriginal: true,
  });
  if (!comment) return next(new AppError('No comment with that ID exists', 404));

  res.status(204).json({
    status: 'success',
    data: null,
  });
});
