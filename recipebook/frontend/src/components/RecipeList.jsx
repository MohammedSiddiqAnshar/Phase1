import React, { useState } from 'react';

const RecipeCard = ({ recipe }) => {
  const [showSteps, setShowSteps] = useState(false);

  const toggleSteps = () => setShowSteps(prev => !prev);

  return (
    <div className="card">
      <h3>{recipe.title}</h3>

      <div className="tag">
        <span>{recipe.category || 'Uncategorized'}</span>
      </div>

      <p><strong>Ingredients:</strong> {recipe.ingredients.map(i => i.name).join(', ')}</p>

      <button onClick={toggleSteps}>
        {showSteps ? 'Hide Steps' : 'Show Steps'}
      </button>

      {showSteps && (
        <ol style={{ marginTop: '0.5rem' }}>
          {recipe.steps.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ol>
      )}
    </div>
  );
};

const RecipeList = ({ recipes }) => {
  return (
    <div>
      <h2>🍽️ All Recipes</h2>
      <div className="recipe-grid">
        {recipes.map(recipe => (
          <RecipeCard key={recipe._id} recipe={recipe} />
        ))}
      </div>
    </div>
  );
};

export default RecipeList;
