const mongoose = require('mongoose');

const schema = new mongoose.Schema(
  {
    from: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'A User should follow'],
    },
    to: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'A User should be followed'],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

const Follow = mongoose.model('Follow', schema);
module.exports = Follow;
