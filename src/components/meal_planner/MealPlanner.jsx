// Import Modules
//Import react, useState, and useEffect
import React, { useState, useEffect } from "react";

// Function for MealPlanner component
function MealPlanner({ favorites }) {
  // Use state to store the meal of each day
  const [meals, setMeals] = useState({
    Monday: "",
    Tuesday: "",
    Wednesday: "",
    Thursday: "",
    Friday: "",
    Saturday: "",
    Sunday: "",
  });

  // Handle meal selection for each day
  const handleMealSelect = (day, meal) => {
    // Update the state of the meal
    setMeals((prevMeal) => ({
      // Copy current stat of of meals
      ...prevMeal,
      //Dynamically update the meal for each day
      [day]: meal,
    }));
  };

  // Staging elements
  return (
    <div>
      <h2>MealPlanner</h2>
      <form>
        {/* Extract all keys from meals and loop through each day */}
        {Object.keys(meals).map((day) => (
          //Create a div for each day with key day
          <div key={day}>
            {/* Display the name of the day as the label */}
            <label>{day}:</label>
            <select
              // Set the value to the meal selected with index the day
              value={meals[day]}
              // When selecting a meal, update the meals state with the handler
              onChange={(event) => handleMealSelect(day, event.target.value)}
            >
              {/* Default option, prompt user to select a meal from dropdown  */}
              <option value="">Select a favorite meal</option>
              {/* Loop through favorites array and add them as choice to dropdown menu */}
              {favorites.map((meal) => (
                <option key={meal.id} value={meal.name}>
                  {meal.name}
                </option>
              ))}
            </select>
          </div>
        ))}
        {/* Save selected meal */}
        <button type="submit">Save</button>
      </form>
    </div>
  );
}

// Export MealPlanner component
export default MealPlanner;
