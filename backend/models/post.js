const mongoose = require('mongoose');

const schema = new mongoose.Schema(
  {
    photo: {
      type: 'String',
    },
    caption: {
      type: 'String',
      required: [true, 'A Post must have a caption'],
      minLength: 5,
      maxLength: 500,
    },
    author: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'A Post must have an author'],
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false,
    },
    active: {
      type: Boolean,
      default: true,
      select: false,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

schema.virtual('comments', {
  ref: 'Comment',
  foreignField: 'post',
  localField: '_id',
});

schema.virtual('likes', {
  ref: 'Like',
  foreignField: 'post',
  localField: '_id',
});

schema.pre(/^find/, function (next) {
  this.find({ active: { $ne: false } });
  next();
});

const Post = mongoose.model('Post', schema);
module.exports = Post;
