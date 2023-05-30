const multer = require('multer');
const sharp = require('sharp');
const Post = require('../models/post');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');
const { deleteOne, getAll } = require('./factory');

exports.getPosts = getAll(Post);
exports.getPost = catchAsync(async (req, res, next) => {
  const post = await Post.findById(req.params.id)
    .populate({ path: 'author', select: 'name photo' })
    .populate('comments')
    .populate('likes');

  if (!post) return next(new AppError('No post with that ID', 404));

  res.status(200).json({
    status: 'success',
    data: post,
  });
});

exports.createPost = catchAsync(async (req, res, next) => {
  if (!req.body.author) req.body.author = req.user.id;
  if (req.file) req.body.photo = req.file.filename;
  const post = await Post.create(req.body);
  post.active = undefined;

  res.status(200).json({
    status: 'success',
    data: post,
  });
});

exports.updatePost = catchAsync(async (req, res, next) => {
  const post = await Post.findById(req.params.id);
  if (post.author.toString() !== req.user.id)
    return next(
      new AppError('You are not authorized to update that post', 401),
    );

  const freshPost = await Post.findByIdAndUpdate(post._id, req.body, {
    new: true,
  });
  res.status(200).json({
    status: 'success',
    data: freshPost,
  });
});

exports.deletePost = catchAsync(async (req, res, next) => {
  const post = await Post.findById(req.params.id);
  if (post.author.toString() !== req.user.id)
    return next(
      new AppError('You are not authorized to delete that post', 401),
    );

  await Post.findByIdAndUpdate(post._id, { active: false });
  res.status(204).json({
    status: 'success',
    data: null,
  });
});
exports.deleteByAdmin = deleteOne(Post);

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) cb(null, true);
  else cb(new AppError('Not an image.', 400), false);
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadPostPhoto = upload.single('photo');

exports.resizePhoto = catchAsync(async(req, res, next) => {
  if (!req.file) return next();
  req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`;
  await sharp(req.file.buffer)
    .resize(1500, 1500)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`public/img/posts/${req.file.filename}`);
  next();
});
