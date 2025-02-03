// Import modules
import React, { useState } from 'react';  // Import react and useState
import './RecipeSearch.css'; // Import styling sheet


// RecipeSearch function
function RecipeSearch({ searchQuery, setSearchQuery, handleSearch }) {

    // Event handler for changes in input field
    const handleInputChange = (event) => {
        setSearchQuery(event.target.value);
    };

  return (
    <div className='recipe-search-div'>
        <div className="recipe-search-header">
            <h2>Explore <span>Recipes</span></h2>
        </div>
        <input 
        type="text" 
        value={searchQuery} 
        onChange={handleInputChange}
        placeholder='Explore Recipes...'
        />
        <button onClick={handleSearch}>Search</button>
    </div>
  );
};


// Export RecipeSearch component
export default RecipeSearch;