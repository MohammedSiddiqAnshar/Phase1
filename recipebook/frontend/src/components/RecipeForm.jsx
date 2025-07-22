import React, { useState } from 'react';

const RecipeForm = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [steps, setSteps] = useState('');
  const [category, setCategory] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const ingredientList = ingredients.split(',').map(i => ({
      name: i.trim(), quantity: 1, unit: 'unit'
    }));

    const newRecipe = {
      title,
      ingredients: ingredientList,
      steps: steps.split('\n'),
      category
    };

    await fetch('http://localhost:5000/api/recipes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newRecipe)
    });

    onAdd();
    setTitle('');
    setIngredients('');
    setSteps('');
    setCategory('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" required />
      <input value={ingredients} onChange={e => setIngredients(e.target.value)} placeholder="Ingredients (comma-separated)" required />
      <textarea value={steps} onChange={e => setSteps(e.target.value)} placeholder="Steps (new line for each)" required />
      <input value={category} onChange={e => setCategory(e.target.value)} placeholder="Category" />
      <button type="submit">Add Recipe</button>
    </form>
  );
};

export default RecipeForm;
