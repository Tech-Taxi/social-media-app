const Like = require("../models/like");
const Post = require("../models/post");
const catchAsync = require("../utils/catchAsync");

exports.createLike = catchAsync(async (req, res, next) => {
  if (!req.body.user) req.body.user = req.user.id;
  if (!req.body.post) req.body.post = req.params.postId;

  const existingLike = await Like.findOne({
    user: req.body.user,
    post: req.body.post,
  });

  if (existingLike) {
    await Like.deleteOne({ _id: existingLike._id });
    let post = await Post.findById(req.body.post);
    post.likes = post.likes.map((like) => like.user);
    res.status(201).json({
      status: "success",
      data: { post },
    });
    return;
  }

  await Like.create(req.body);
  let post = await Post.findById(req.body.post);
  post.likes = post.likes.map((like) => like.user);
  res.status(201).json({
    status: "success",
    data: { post },
  });
});

exports.getLikes = catchAsync(async (req, res, next) => {
  const likes = await Like.find({ post: req.params.postId });
  res.status(200).json({
    status: "success",
    data: likes,
    count: likes.length,
  });
});
