// controllers/postController.js
import Post from "../models/Post.js";

// Get all posts
export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.json({ posts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch posts" });
  }
};

// Seed posts
export const seedPosts = async (req, res) => {
  try {
    await Post.deleteMany();
    const samplePosts = [
      { title: "Hello World", content: "This is the first post" },
      { title: "Another Post", content: "More content here" },
    ];
    await Post.insertMany(samplePosts);
    res.send("Seeded!");
  } catch (error) {
    console.error(error);
    res.status(500).send("Seeding failed");
  }
};
