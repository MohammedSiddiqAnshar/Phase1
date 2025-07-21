import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

export default function Cuisine() {
  const [recipes, setRecipes] = useState([]);
  const { type } = useParams();

  useEffect(() => {
    const fetchCuisine = async () => {
      try {
        const res = await fetch(
          `https://api.spoonacular.com/recipes/complexSearch?apiKey=2b0b491aa44947ca802520c4ffafb5b6&cuisine=${type}`
        );
        const data = await res.json();
        setRecipes(data.results);
      } catch (error) {
        console.error('Error fetching cuisine:', error);
      }
    };

    fetchCuisine();
  }, [type]);

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
