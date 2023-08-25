const mongoose = require("mongoose");

const Comment = require("./comment");
const Like = require("./like");

const schema = new mongoose.Schema(
  {
    photo: {
      type: "String",
    },
    caption: {
      type: "String",
      required: [true, "A Post must have a caption"],
      minLength: 5,
      maxLength: 500,
    },
    author: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "A Post must have an author"],
    },
    createdAt: {
      type: Date,
      default: Date.now,
      select: false,
      expires: 60 * 60 * 24,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

schema.virtual("comments", {
  ref: "Comment",
  foreignField: "post",
  localField: "_id",
});

schema.virtual("likes", {
  ref: "Like",
  foreignField: "post",
  localField: "_id",
});

const Story = mongoose.model("Story", schema);
module.exports = Story;
