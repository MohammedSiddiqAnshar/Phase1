const express = require('express');
const router = express.Router();
const Recipe = require('../models/Recipe');

// GET /api/recipes?search=...
router.get('/', async (req, res) => {
  try {
    const search = req.query.search || '';
    const query = search
      ? { title: { $regex: new RegExp(search, 'i') } }
      : {};

    const recipes = await Recipe.find(query);
    res.json(recipes);
  } catch (err) {
    console.error('❌ Error fetching recipes:', err.message);
    res.status(500).json({ message: 'Server error while fetching recipes' });
  }
});

// POST /api/recipes
router.post('/', async (req, res) => {
  try {
    const { title, category, ingredients, steps } = req.body;

    if (!title || !category || !ingredients || !steps) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const newRecipe = new Recipe({
      title,
      category,
      ingredients,
      steps,
    });

    const savedRecipe = await newRecipe.save();
    res.status(201).json(savedRecipe);
  } catch (err) {
    console.error('❌ Error saving recipe:', err.message);
    res.status(500).json({ message: 'Server error while saving recipe' });
  }
});

module.exports = router;
