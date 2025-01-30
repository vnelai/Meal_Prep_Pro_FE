// Import modules
import React from "react";  // Import react module
 // Import Link component, helps with navigation 
 // //to other pages without triggering full page reload
import { Link } from 'react-router-dom';
import './Nav.css';  // Import Nav css file for styling


function Nav() {
  return (
    <nav className="menu">
        <ul className="menu-links">
            <li>
                {/* Home Page where hero and featured will be */}
                <Link to='/' className="menu-link">Home</Link>
            </li>
            <li>
                {/* Recipes page where users can explore recipes from external API */}
                <Link to='/recipes' className="menu-link">Recipes</Link>
            </li>
            <li>
                {/* Favorites page that will display all users favorites even custom recipes */}
                <Link to='/favorites' className="menu-link">Favorites</Link>
            </li>
            <li>
                {/* Meal planner page where user can set a schedule for their meals */}
                <Link to='/meal-planner' className="menu-link">Meal Planner</Link>
            </li>
            <li>
                {/* Shopping list page allows users to save needed ingredients for their favorite recipes */}
                <Link to='/shopping-list' className="menu-link">Shopping List</Link>
            </li>
        </ul>
    </nav>
  );
};

export default Nav