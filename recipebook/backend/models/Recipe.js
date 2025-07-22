// models/Recipe.js

const mongoose = require('mongoose');

// Define the schema
const ingredientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  quantity: { type: String, required: true }
});

const recipeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  ingredients: [ingredientSchema],
  steps: [String]
});

// Explicitly define collection name (lowercase to match MongoDB's default behavior)
module.exports = mongoose.model('Recipe', recipeSchema, 'recipebox'); // Use 'recipebox' here to ensure case consistency
