
router.get("/profile/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user.getProfile());
  } catch {
    res.status(400).json({ error: "Invalid ID" });
  }
});


router.get("/domain/:domain", async (req, res) => {
  const users = await User.findByEmailDomain(req.params.domain);
  res.json(users);
});
