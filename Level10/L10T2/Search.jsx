import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';

export default function Search() {
  const [results, setResults] = useState([]);
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');

  useEffect(() => {
    const fetchSearch = async () => {
      try {
        const res = await fetch(
          `https://api.spoonacular.com/recipes/complexSearch?apiKey=2b0b491aa44947ca802520c4ffafb5b6&query=${query}`
        );
        const data = await res.json();
        setResults(data.results);
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    };

    if (query) {
      fetchSearch();
    }
  }, [query]);

  return (
    <div className="grid">
      {results.map((recipe) => (
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
