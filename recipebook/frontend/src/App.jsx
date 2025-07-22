import React from 'react';
import AddRecipe from './components/AddRecipe';
import RecipeSearch from './components/RecipeSearch';
// Adjust path if needed
import './styles.css';

function App() {
  return (
    <div>
      <h1>📖 RecipeBox</h1>
      <AddRecipe />
    </div>
  );
}

export default App;
