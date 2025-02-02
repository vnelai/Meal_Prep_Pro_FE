// Import Modules
//Import react, useState, and useEffect
import React, { useState, useEffect } from "react";
// Import MealPlanner component
import MealPlanner from '../../components/meal_planner/MealPlanner';


// MealPlanner page function
function MealPlannerPage() {
    const [favorites, setFavorites]= useState([]);

    useEffect(() => {
        //Fetch favorites meals from backend
        async function fetchFavorites() {
            try {
                const res = await fetch('/api/favorites');
                const data = await res.json();
                setFavorites(data);  // Set results in json format
            } catch (error) {
                console.error ("Failed to fetch favorite recipes:", error);
            }
        }
        fetchFavorites(); //Call fetch function
    }, []);

  return (
    <div>
        <MealPlanner favorites={favorites}/>
    </div>
  );
}

// Export MealPlanner page
export default MealPlannerPage;