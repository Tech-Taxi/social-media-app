const multer = require('multer');
const sharp = require('sharp');
const User = require('../models/user');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');
const { deleteOne, updateOne, getOne, getAll } = require('./factory');

const filterObj = (obj, ...fields) => {
  let fresh = {};
  fields.forEach((el) => {
    if (obj[el]) fresh[el] = obj[el];
  });
  return fresh;
};

exports.getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};

// const multerStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'public/img/users');
//   },
//   filename: (req, file, cb) => {
//     const ext = file.mimetype.split('/')[1];
//     cb(null, `user-${req.user.id}-${Date.now()}.${ext}`);
//   },
// });

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) cb(null, true);
  else cb(new AppError('Not an image.', 400), false);
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadUserPhoto = upload.single('photo');

exports.resizePhoto = (req, res, next) => {
  if (!req.file) return next();
  req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`;
  sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`public/img/users/${req.file.filename}`);
  next();
};

exports.updateMe = catchAsync(async (req, res, next) => {
  if (req.body.password || req.body.confirmPassword)
    return next(
      new AppError(
        'Please use the /updatePassword route to update your password.',
        400,
      ),
    );
  const updates = filterObj(req.body, 'name', 'email');
  if (req.file) updates.photo = req.file.filename;
  const user = await User.findByIdAndUpdate(req.user.id, updates, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    status: 'success',
    data: user,
  });
});

exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

exports.getUsers = getAll(User);
exports.getUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id)
    .populate('posts')
    .populate('comments')
    .populate('likes');
  if (!user) return next(new AppError('No user with that ID', 404));

  res.status(200).json({
    status: 'success',
    data: user,
  });
});
exports.deleteUser = deleteOne(User);
exports.updateUser = updateOne(User);
