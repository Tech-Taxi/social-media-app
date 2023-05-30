const multer = require('multer');
const sharp = require('sharp');
const Story = require('../models/story');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');
const { deleteOne, getAll } = require('./factory');

exports.getStorys = getAll(Story);
exports.getStory = catchAsync(async (req, res, next) => {
  const story = await Story.findById(req.params.id)
    .populate({ path: 'author', select: 'name photo' })
    .populate('comments')
    .populate('likes');

  if (!story) return next(new AppError('No story with that ID', 404));

  res.status(200).json({
    status: 'success',
    data: story,
  });
});

exports.createStory = catchAsync(async (req, res, next) => {
  if (!req.body.author) req.body.author = req.user.id;
  if (req.file) req.body.photo = req.file.filename;
  const story = await Story.create(req.body);
  story.active = undefined;

  res.status(200).json({
    status: 'success',
    data: story,
  });
});

exports.updateStory = catchAsync(async (req, res, next) => {
  const story = await Story.findById(req.params.id);
  if (story.author.toString() !== req.user.id)
    return next(
      new AppError('You are not authorized to update that story', 401),
    );

  const freshStory = await Story.findByIdAndUpdate(story._id, req.body, {
    new: true,
  });
  res.status(200).json({
    status: 'success',
    data: freshStory,
  });
});

exports.deleteStory = catchAsync(async (req, res, next) => {
  const story = await Story.findById(req.params.id);
  if (story.author.toString() !== req.user.id)
    return next(
      new AppError('You are not authorized to delete that story', 401),
    );

  await Story.deleteOne({_id: story._id});
  res.status(204).json({
    status: 'success',
    data: null,
  });
});
exports.deleteByAdmin = deleteOne(Story);

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) cb(null, true);
  else cb(new AppError('Not an image.', 400), false);
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadStoryPhoto = upload.single('photo');

exports.resizePhoto = catchAsync(async(req, res, next) => {
  if (!req.file) return next();
  req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`;
  await sharp(req.file.buffer)
    .resize(1500, 1500)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`public/img/storys/${req.file.filename}`);
  next();
});
