// Import modules
import React, { useState, useEffect} from 'react';  // Import react, useState, useEffect
// Import RecipeSearch component
import RecipeSearch from '../../components/recipe_search/RecipeSearch'
import RecipeList from '../../components/recipe_list/RecipeList'; // Import RecipeList component



function Recipes() {
  // State that will track and set the searchQuery 
  const [searchQuery, setSearchQuery] = useState('');
  // State that will track and set the recipeData from external api
  const [recipeData, setRecipeData] = useState([]);
  // Track if search has been performed
  const [searchPerformed, setSearchPerformed] = useState(false); 
  // Track and set filtered recipes
  const [filteredRecipes, setFilteredRecipes] = useState([]); 

  useEffect(() => {
    // Function to fetch api recipes
    const fetchApiRecipes = async () => {
      try {
        // I will be fetching from backend route so my API_KEY remains hidden
        const res = await fetch(`http://localhost:5001/api/recipes/search?query=${searchQuery}`);
        const data = await res.json();
        setRecipeData(data);  //Save data to state
        setFilteredRecipes(data); // Initially, filtered data is all data
      } catch (error) {
        console.error("Failed to fetch recipes:", error);
        setRecipeData([]); // Clear data on error
        setFilteredRecipes([]);
      }     
    };

    // Fetch api only if search has been initiated and searchQuery is not empty
    if (searchPerformed && searchQuery ) { 
      fetchApiRecipes();
    }


  }, []);   // Fetch once once it mounts

  useEffect(() => {
    // Filter recipes when user searches
    if (recipeData.length > 0) {
      const filteredData = recipeData.filter(recipe =>
        recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) // Filter by title
      );
      setFilteredRecipes(filteredData);
    }
  }, [searchQuery, recipeData]); // Filter when searchQuery or recipe data changes

  // const handleSearch = () => {
  //   setSearchPerformed(true); // Activate when user clicks search
  // };

console.log(recipeData); // This will show the structure of the data

  return (
    <div>
        <RecipeSearch
          searchQuery={searchQuery} 
          setSearchQuery={setSearchQuery}
          // handleSearch={handleSearch} 
        />  
        <RecipeList recipes={filteredRecipes || []} />
    </div>
  )
}

// Export Recipes
export default Recipes;