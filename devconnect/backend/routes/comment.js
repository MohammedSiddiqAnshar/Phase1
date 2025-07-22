const express = require('express');
const router = express.Router();
const Comment = require('../models/comment');
const auth = require('../middleware/auth');

router.post('/:postId', auth, async (req, res) => {
  const comment = new Comment({
    postId: req.params.postId,
    userId: req.user.id,
    text: req.body.text
  });
  await comment.save();
  res.json(comment);
});

router.get('/:postId', async (req, res) => {
  const comments = await Comment.find({ postId: req.params.postId }).populate('userId');
  res.json(comments);
});

module.exports = router;