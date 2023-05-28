const mongoose = require('mongoose');

const schema = new mongoose.Schema(
  {
    post: {
      type: mongoose.Schema.ObjectId,
      ref: 'Post',
      required: [true, 'A Like must belong to a Post'],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'A Like must be given by some User'],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

schema.index({post: 1, user: 1}, {unique: true})

const Like = mongoose.model('Like', schema);
module.exports = Like;
