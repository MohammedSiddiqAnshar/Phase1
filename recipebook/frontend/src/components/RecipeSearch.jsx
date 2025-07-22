import { useState } from 'react';

function RecipeSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [statusMessage, setStatusMessage] = useState('');

  const handleSearch = async () => {
    if (!searchTerm.trim()) return;

    setStatusMessage(`🔍 Searching for "${searchTerm}"...`);
    try {
      const res = await fetch(`http://localhost:5000/api/recipes?search=${encodeURIComponent(searchTerm)}`);
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const data = await res.json();

      if (data.length > 0) {
        setRecipes(data);
        setStatusMessage(`✅ Found ${data.length} recipe(s) for "${searchTerm}"`);
      } else {
        setRecipes([]);
        setStatusMessage(`⚠️ No recipes found for "${searchTerm}"`);
      }
    } catch (err) {
      console.error('❌ Error searching recipes:', err.message);
      setStatusMessage('❌ Error searching recipes. Try again.');
    }
  };

  return (
    <div style={{ padding: '1rem', maxWidth: '800px', margin: 'auto' }}>
      <h2>🍽️ Search Recipes</h2>
      <div style={{ marginBottom: '1rem' }}>
        <input
          type="text"
          value={searchTerm}
          placeholder="Enter recipe title..."
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ padding: '0.5rem', fontSize: '1rem', width: '70%', marginRight: '0.5rem' }}
        />
        <button onClick={handleSearch} style={{ padding: '0.5rem 1rem', fontSize: '1rem' }}>
          Search
        </button>
      </div>
      <p>{statusMessage}</p>

      {recipes.map((recipe, index) => (
        <div key={index} className="card">
          <h3>{recipe.title}</h3>
          <p><strong>Category:</strong> {recipe.category}</p>
          <p><strong>Ingredients:</strong></p>
          <ul>
            {recipe.ingredients.map((ing, idx) => (
              <li key={idx}>{ing.quantity} - {ing.name}</li>
            ))}
          </ul>
          <p><strong>Steps:</strong></p>
          <ol>
            {recipe.steps.map((step, idx) => (
              <li key={idx}>{step}</li>
            ))}
          </ol>
        </div>
      ))}
    </div>
  );
}

export default RecipeSearch;
