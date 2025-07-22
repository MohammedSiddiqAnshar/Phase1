import { useEffect, useState } from 'react';

function AddRecipe() {
  const [statusMessage, setStatusMessage] = useState('Fetching recipes...');
  const [searchQuery, setSearchQuery] = useState('');
  const [recipes, setRecipes] = useState([]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = async () => {
    if (searchQuery.trim() === '') {
      setStatusMessage('❌ Please enter a search query.');
      return;
    }

    try {
      const res = await fetch(`http://localhost:5000/api/recipes?search=${searchQuery}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!res.ok) {
        setStatusMessage(`❌ Failed to fetch recipes: ${res.status}`);
        return;
      }

      const data = await res.json();
      if (data.length === 0) {
        setStatusMessage(`❌ No recipes found for "${searchQuery}"`);
      } else {
        setRecipes(data);
        setStatusMessage(`✅ Recipes for "${searchQuery}" fetched successfully!`);
      }
    } catch (err) {
      console.error('❌ Error searching recipes:', err.message);
      setStatusMessage('❌ Error searching recipes.');
    }
  };

  useEffect(() => {
    // Initial fetch to show all recipes
    const fetchRecipes = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/recipes', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });

        const data = await res.json();
        setRecipes(data);
      } catch (err) {
        console.error('❌ Error fetching recipes:', err.message);
        setStatusMessage('❌ Error fetching recipes.');
      }
    };

    fetchRecipes();
  }, []);

  return (
    <div style={{ padding: '1rem', fontFamily: 'Arial, sans-serif' }}>
      <h2>🍹 Recipe Fetching</h2>
      <p>{statusMessage}</p>

      <div style={{ marginBottom: '1rem' }}>
        <input
          type="text"
          placeholder="Search for a recipe..."
          value={searchQuery}
          onChange={handleSearchChange}
          style={{
            padding: '0.75rem',
            borderRadius: '8px',
            border: '1px solid #ccc',
            fontSize: '1rem',
            width: '80%',
            marginRight: '1rem',
          }}
        />
        <button
          onClick={handleSearch}
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: '#4caf50',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontWeight: 'bold',
            fontSize: '1rem',
            cursor: 'pointer',
            transition: 'background-color 0.3s',
          }}
        >
          Search
        </button>
      </div>

      <div>
        {recipes.length > 0 ? (
          <ul>
            {recipes.map((recipe) => (
              <li key={recipe._id} style={{ marginBottom: '1rem' }}>
                <h3>{recipe.title}</h3>
                <p>Category: {recipe.category}</p>
                <h4>Ingredients:</h4>
                <ul>
                  {recipe.ingredients.map((ingredient, index) => (
                    <li key={index}>
                      {ingredient.name}: {ingredient.quantity}
                    </li>
                  ))}
                </ul>
                <h4>Steps:</h4>
                <ol>
                  {recipe.steps.map((step, index) => (
                    <li key={index}>{step}</li>
                  ))}
                </ol>
              </li>
            ))}
          </ul>
        ) : (
          <p>No recipes found.</p>
        )}
      </div>
    </div>
  );
}

export default AddRecipe;
