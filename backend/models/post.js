const mongoose = require('mongoose');

const Comment = require('./comment');
const Like = require('./like');

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
      default: Date.now,
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

schema.virtual('age').get(function () {
  let time = (new Date() - this.createdAt) / (1000 * 60);

  if (time < 60) return `${Math.floor(time)}min`;

  time /= 60;
  if (time < 24) return `${Math.floor(time)}hr`;

  time /= 24;
  if (time < 30) return `${Math.floor(time)}d`;

  time /= 30;
  if (time < 12) return `${Math.floor(time)}m`;

  time /= 12;
  return `${Math.floor(time)}yr`;
});

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

schema.virtual('likeCount').get(function () {
  return this.likes.length;
});

schema.virtual('commentCount').get(function () {
  return this.comments.length;
});

schema.pre(/^find/, function (next) {
  this.find({ active: { $ne: false } });
  this.populate({ path: 'author', select: 'name photo' })
    .populate({
      path: 'likes',
      select: 'post user',
    })
    .populate({ path: 'comments', select: 'post' })
  next();
});

const Post = mongoose.model('Post', schema);
module.exports = Post;
