const express = require('express');
const router = express.Router();
const Post = require('../models/post');
const auth = require('../middleware/auth');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

router.post('/', auth, upload.single('image'), async (req, res) => {
  const post = new Post({
    userId: req.user.id,
    content: req.body.content,
    image: req.file ? req.file.path : null
  });
  await post.save();
  res.json(post);
});

router.get('/', async (req, res) => {
  const posts = await Post.find().populate('userId').sort({ createdAt: -1 });
  res.json(posts);
});

router.put('/like/:id', auth, async (req, res) => {
  const post = await Post.findById(req.params.id);
  const alreadyLiked = post.likes.includes(req.user.id);
  if (alreadyLiked) {
    post.likes.pull(req.user.id);
  } else {
    post.likes.push(req.user.id);
  }
  await post.save();
  res.json(post);
});

module.exports = router;