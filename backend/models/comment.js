const mongoose = require('mongoose');

const schema = new mongoose.Schema(
  {
    content: {
      type: 'String',
      required: [true, 'A Comment must have some content'],
    },
    author: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'A Comment must be given by some User'],
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    post: {
      type: mongoose.Schema.ObjectId,
      ref: 'Post',
      required: [true, 'A Comment must belong to a Post'],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

const Comment = mongoose.model('Comment', schema);
module.exports = Comment;
