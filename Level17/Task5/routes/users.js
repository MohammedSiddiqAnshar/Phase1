const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = require("../models/User");


const validateObjectId = (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ error: "Invalid user ID format" });
  }
  next();
};


router.put("/:id", validateObjectId, async (req, res) => {
  const { name, email } = req.body;

  
  if (!name || !email) {
    return res.status(400).json({ error: "Name and email are required" });
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { name, email },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ message: "User updated", data: updatedUser });
  } catch (err) {
    res.status(500).json({ error: "Failed to update user" });
  }
});


router.delete("/:id", validateObjectId, async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ message: "User deactivated (soft delete)", data: user });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete user" });
  }
});

module.exports = router;
