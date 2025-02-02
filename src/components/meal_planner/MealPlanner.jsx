// Import Modules
//Import react, useState, and useEffect
import React, { useState, useEffect } from "react";
import "./MealPlanner.css"; // Import  CSS file

// Function for MealPlanner component
function MealPlanner({ favorites }) {
  // Use state to store the meal of each day
  const [meals, setMeals] = useState({
    Monday: { Breakfast: "", Lunch: "", Dinner: "" },
    Tuesday: { Breakfast: "", Lunch: "", Dinner: "" },
    Wednesday: { Breakfast: "", Lunch: "", Dinner: "" },
    Thursday: { Breakfast: "", Lunch: "", Dinner: "" },
    Friday: { Breakfast: "", Lunch: "", Dinner: "" },
    Saturday: { Breakfast: "", Lunch: "", Dinner: "" },
    Sunday: { Breakfast: "", Lunch: "", Dinner: "" },
  });

  // Handle meal selection for each day
  const handleMealSelect = (day, mealType, meal) => {
    // Update the state of the meal
    setMeals((prevMeal) => ({
      // Copy current stat of of meals
      ...prevMeal,
      //Dynamically update the meal for each day
      [day]: {
        ...prevMeal[day],
        [mealType]: meal,
      },
    }));
  };

  // Handle submit button to save meal plan selection
  const handleSubmit = async (event) => {
    // Prevent page reload, which is default for form submission
    event.preventDefault();

    // Send saved meal planner data to backend
    try {
      // Send data to server with POST method
      const res = await fetch("/api/meal-planner", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(meals),
      });

      if (res.ok) {
        alert("Meal plan saved to backend");
      } else {
        alert("Failed to save meal plan to backend");
      }
    } catch (error) {
      console.error("Failed to save meal plan:", error);
    }
  };

  // Staging elements
  return (
    <div className="meal-planer-div">
      <div className="header-div">
        <h2>MealPlanner</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="weekly-calendar">
          {/* Extract all keys from meals and loop through each day */}
          {Object.keys(meals).map((day) => (
            //Create a div for each day with key day
            <div key={day} className="day-div">
              {/* Display the name of the day as the label */}
              <h3>{day}</h3>
              {/* Loop through meal types and create a div for them */}
              {["Breakfast", "Lunch", "Dinner"].map((mealType) => (
                <div key={mealType} className="selected-meal">
                  <label>{mealType}</label>
                  <select
                    // Set the value to the meal selected
                    value={meals[day][mealType]}
                    // When selecting a meal, update the meals state with the handler
                    onChange={(event) =>
                      handleMealSelect(day, mealType, event.target.value)
                    }
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
            </div>
          ))}
        </div>
        {/* Save selected meal */}
        <button type="submit">Save</button>
      </form>
    </div>
  );
}

// Export MealPlanner component
export default MealPlanner;
