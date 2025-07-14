const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = require("../models/User");


router.get("/", async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const skip = parseInt(req.query.skip) || 0;
    const { name, email } = req.query;

    const filter = {};
    if (name) filter.name = new RegExp(name, "i");
    if (email) filter.email = new RegExp(email, "i");

    const users = await User.find(filter).limit(limit).skip(skip);
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});


router.get("/:id", async (req, res) => {
  const { id } = req.params;


  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid user ID" });
  }

  try {
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
