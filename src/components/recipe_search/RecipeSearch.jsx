// Import modules
import React, { useState } from 'react';  // Import react and useState


// RecipeSearch function
function RecipeSearch() {
    // State that will track and set the searchQuery 
    const [searchQuery, setSearchQuery] = useState('');
    // State that will track and set the recipeData from external api
    const [recipeData, setRecipeData] = useState([]);

    // Event handler for changes in input field
    const handleInputChange = (event) => {
        setSearchQuery(event.target.value);
    };

    // Function to fetch api recipes
    const fetchApiRecipes = async () => {
        // I will be fetching from backend route so my API_KEY remains hidden
        const res = await fetch(`/api/recipes/search?query=${searchQuery}`);
        const data = await res.json();
        setRecipeData(data.results);
    };

  return (
    <div>
        <input 
        type="text" 
        value={searchQuery} 
        onChange={handleInputChange}
        placeholder='Explore Recipes...'
        />
        <button onClick={fetchApiRecipes}>Search</button>

        <div>
            {/* Mapping over recipes array and rendering data */}
            {recipeData.map((recipe)=> (
                <div key={recipe.id}>
                    <h3>{recipe.title}</h3>
                    <p>{recipe.summary}</p>
                </div>    
            ))}
        </div>
    </div>
  );
};


// Export RecipeSearch component
export default RecipeSearch;