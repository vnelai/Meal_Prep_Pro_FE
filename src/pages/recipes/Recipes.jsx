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
      const res = await fetch(`https://meal-prep-pro-be.onrender.com/api/recipes/search?query=${searchQuery}`);
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

    try {
      // Extract instructions from analyzedInstructions
      const instructions = recipe.analyzedInstructions && recipe.analyzedInstructions.length > 0 // If analyzed instructions exists and has a length greater than zero
        ? recipe.analyzedInstructions // Then set the instructions = recipe.analyzedInstructions
            // Grab the text from each step
            .map(instruction => {
              return instruction.steps
              .map(step => step.step) // Access the 'step' field directly
              .join('\n') // Join multiple steps' text into one string
            })  
            .join('\n') // Join multiple instructions together
        : recipe.summary; // Fallback to summary if no instructions found
        console.log("Steps in Analyzed Instructions:", recipe.analyzedInstructions.map(instruction => instruction.steps));

      // Restructure the recipe object to match the backend schema
      const formattedRecipe = {
        recipeName: recipe.title, // title from the API res maps to recipeName
        recipeImg: recipe.image,  
        instructions: instructions,
        ingredients: recipe.extendedIngredients?.map(ingredient => ({
          name: ingredient.name,
          quantity: ingredient.amount,
          unit: ingredient.unit,
        })) || [],  //Adding this just incase extended ingredients are undefined
      };

      console.log("Formatted Recipe:", formattedRecipe);


      // Save favorite to backend with a POST request
      const res = await fetch('http://localhost:5001/api/favorites', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(formattedRecipe),
      });
      
      // Send messages to user
      if (res.ok) {
        alert('Recipe added to favorites');
         // Save new favorite recipe to Favorites state
        const savedFavorite = await res.json();
        setFavorites([...favorites, savedFavorite]);
      } else {
        alert("Failed to add recipe to favorites");
      }
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