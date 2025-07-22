const Recipe = require('../models/Recipe');

exports.getRecipes = async (req, res) => {
  const recipes = await Recipe.find();
  res.json(recipes);
};

exports.createRecipe = async (req, res) => {
  const recipe = new Recipe(req.body);
  await recipe.save();
  res.status(201).json(recipe);
};
