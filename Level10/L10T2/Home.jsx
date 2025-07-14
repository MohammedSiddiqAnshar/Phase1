import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchPopular = async () => {
      try {
        const cached = localStorage.getItem('popular');

        if (cached && cached !== 'undefined') {
          const parsed = JSON.parse(cached);
          if (Array.isArray(parsed)) {
            setRecipes(parsed);
            return;
          }
        }

        const res = await fetch(
          `https://api.spoonacular.com/recipes/random?apiKey=2b0b491aa44947ca802520c4ffafb5b6&number=12&tags=vegetarian`
        );
        const data = await res.json();

        if (data.recipes) {
          localStorage.setItem('popular', JSON.stringify(data.recipes));
          setRecipes(data.recipes);
        }
      } catch (error) {
        console.error('Error fetching popular recipes:', error);
        localStorage.removeItem('popular');
      }
    };

    fetchPopular();
  }, []);

  return (
    <div className="grid">
      {recipes.map((recipe) => (
        <div key={recipe.id}>
          <Link to={`/recipe/${recipe.id}`}>
            <img src={recipe.image} alt={recipe.title} />
            <h4>{recipe.title}</h4>
          </Link>
        </div>
      ))}
    </div>
  );
}
