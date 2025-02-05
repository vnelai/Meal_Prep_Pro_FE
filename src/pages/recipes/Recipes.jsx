// Import modules
import React, { useState, useEffect} from 'react';  // Import react, useState
// Import RecipeSearch component
import RecipeSearch from '../../components/recipe_search/RecipeSearch'
import RecipeList from '../../components/recipe_list/RecipeList'; // Import RecipeList component


function Recipes() {
  // State that will track and set the searchQuery 
  const [searchQuery, setSearchQuery] = useState('');
  // State that will track and set the recipeData from external api
  const [recipeData, setRecipeData] = useState([]);
  // Track and set filtered recipes
  const [filteredRecipes, setFilteredRecipes] = useState([]); 
  // Add recipe to favorites state
  const [favorites, setFavorites] = useState([]);

  // Fetch all recipes on page load
  useEffect(() => {
    fetchApiRecipes(); 
  }, []); // Runs once on mount

  // Fetch recipes from API
  const fetchApiRecipes = async (query = '') => {
    try {
      // I will be fetching from backend route so my API_KEY remains hidden
      // const res = await fetch(`http://localhost:5001/api/recipes/search?query=${searchQuery}`);
      const data = await res.json();
      setRecipeData(data.results || []);  //Save data to state
      setFilteredRecipes(data.results || []); // Initially, filtered data is all data
    } catch (error) {
      console.error("Failed to fetch recipes:", error);
      setRecipeData([]); // Clear data on error
      setFilteredRecipes([]);
    }     
  };

  // Handle adding recipe to favorites
  const handleAddToFavorites = async (recipe) => {
    // Restructure the recipe object to match the backend schema
    const formattedRecipe = {
      recipeName: recipe.title, // title from the API res maps to recipeName
      recipeImg: recipe.image,  
      instructions: recipe.instructions, // instructions remain as is
      ingredients: recipe.extendedIngredients.map(ingredient => ({
        name: ingredient.name,
        quantity: ingredient.amount,
        unit: ingredient.unit,
      })),
    };
    
    try {
      // Save favorite to backend with a POST request
      const res = await fetch('http://localhost:5001/api/favorites', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(formattedRecipe),
      });

      // Save new favorite recipe to Favorites state
      const savedFavorite = await res.json();
      setFavorites([...favorites, savedFavorite]);
    } catch (error) {
      console.error("Failed to add recipe to favorites", error);
    }
  };

  // Handle search button click
  const handleSearch = () => {
    if (!searchQuery.trim()) {
      setFilteredRecipes(recipeData); // Reset to all recipes if search is empty
      return;
    }
    // Filtering recipe data to show only recipes whose titles include the lowercase searchQuery
    const filtered = recipeData.filter(recipe =>
      recipe.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    // Set the filtered recipes to the filteredRecipes state
    setFilteredRecipes(filtered);
  };

  return (
    <div>
        <RecipeSearch
          searchQuery={searchQuery} 
          setSearchQuery={setSearchQuery}
          handleSearch={handleSearch} 
        />  
        <RecipeList recipes={filteredRecipes || []} addToFavorites={handleAddToFavorites}/>
    </div>
  )
}

// Export Recipes
export default Recipes;