// Import Modules
import React from 'react';  // Import React
// Import FavoriteList component
import FavoriteList from '../../components/favorite_list/FavoriteList';
import './Favorites.css'   // Import styling sheet


// Favorites page function
function Favorites() {
  return (
    <div>
        <h1 className='header-name'>Favorite Recipes</h1>
        <FavoriteList/>
    </div>
  );
}

// Export Favorites page
export default Favorites;