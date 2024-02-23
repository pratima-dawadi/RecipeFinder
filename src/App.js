import React, { useState, useEffect } from 'react';
import RecipeCard from './components/RecipeCard';
import Detail from './components/Detail';
import './App.css';

const App = () => {
  const [query, setquery] = useState('');
  const [recipes, setrecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [viewActive, setViewActive] = useState(false);


  useEffect(() => {
    const fetchAllRecipes = async () => {
      try {
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
        // const response = await fetch(process.env.REACT_APP_API_URL);
        const data = await response.json();

        if (data.meals) {
          setrecipes(data.meals);
        } else {
          setrecipes([]); // No recipes found in the API
        }
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    };
    // Fetch all recipes when the app loads
    fetchAllRecipes();
  }, []);

  const fetchRecipes = async () => {
    try {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
      // const response = await fetch(`${process.env.REACT_APP_API_URL}${query}`);
      const data = await response.json();

      if (data.meals) {
        setrecipes(data.meals);
      } else {
        setrecipes([]); // No matching recipes found
      }
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
  };

  useEffect(() => {
    if (query !== '') {
      // Fetch recipes only when there is a search query
      fetchRecipes();
    }
  }, [query]);

  const handleViewDetail = (recipe) => {
    setSelectedRecipe(recipe);
    setrecipes([]); // Clear the recipe list
    setViewActive(true); 
  };

  const handleBack = () => {
    setSelectedRecipe(null);
    fetchRecipes();
    setViewActive(false);
  };

  return (
    <div className="App">
      <div className="search-container">
        <h1>Recipe Finder</h1>
        {!viewActive && (
        <input
          type="text"
          placeholder="Search for a meal by name...             &#128269;"
          value={query}
          onChange={(e) => setquery(e.target.value)}
        />
        )}
      </div>

      <div className="recipe-cards">
        {recipes.map((recipe) => (
          // Display the recipe cards
          <RecipeCard key={recipe.idMeal} recipe={recipe} onViewDetail={handleViewDetail} />
        ))}
      </div>
      <Detail selectedRecipe={selectedRecipe} onBack={handleBack} />
    </div>
  );
};

export default App;
