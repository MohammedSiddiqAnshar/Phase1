const express = require('express');
const router = express.Router();
const User = require('../models/user');
const auth = require('../middleware/auth');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

router.get('/:id', async (req, res) => {
  const user = await User.findById(req.params.id);
  res.json(user);
});

router.put('/:id', auth, upload.single('avatar'), async (req, res) => {
  const update = req.body;
  if (req.file) update.avatar = req.file.path;
  const user = await User.findByIdAndUpdate(req.params.id, update, { new: true });
  res.json(user);
});

module.exports = router;