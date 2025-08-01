const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  text: String,
}, { timestamps: true });

module.exports = mongoose.model('Comment', commentSchema);