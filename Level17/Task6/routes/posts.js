const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Post = require("../models/Post");
const User = require("../models/User");


const validateObjectId = (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id || req.query.author)) {
    return res.status(400).json({ error: "Invalid ID format" });
  }
  next();
};


router.post("/", async (req, res) => {
  const { title, content, author } = req.body;

  if (!title || !content || !author) {
    return res.status(400).json({ error: "Title, content, and author are required" });
  }

  try {
    const user = await User.findById(author);
    if (!user || !user.isActive) {
      return res.status(404).json({ error: "Author not found or inactive" });
    }

    const newPost = new Post({ title, content, author });
    await newPost.save();
    res.status(201).json({ message: "Post created", data: newPost });
  } catch (err) {
    res.status(500).json({ error: "Failed to create post" });
  }
});


router.get("/", async (req, res) => {
  const { author } = req.query;
  let filter = {};

  if (author) {
    if (!mongoose.Types.ObjectId.isValid(author)) {
      return res.status(400).json({ error: "Invalid author ID" });
    }
    filter.author = author;
  }

  try {
    const posts = await Post.find(filter).populate("author", "name email");
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch posts" });
  }
});


router.get("/user/:id", validateObjectId, async (req, res) => {
  try {
    const posts = await Post.find({ author: req.params.id }).populate("author", "name email");

    if (!posts.length) {
      return res.status(404).json({ message: "No posts found for this user" });
    }

    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch user posts" });
  }
});

module.exports = router;
