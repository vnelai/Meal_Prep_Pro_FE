// Import Modules
// Import react and useState
import React, { useState } from "react";
// Import ShoppingList component
import ShoppingList from "../../components/shopping_list/ShoppingList";
import './ShoppingList.css'  // Import css stylesheet


// Shopping List page function
function ShoppingListPage() {
    // Track and set the grocery items
    // Add some sample data for now
    const [groceryItems, setGroceryItems]= useState([
        { _id: 1, name: "Watermelon" },
        { _id: 2, name: "Feta" },
        { _id: 3, name: "Bread" }
    ]);

    // Track and set new grocery items
    const [newGroceryItem, setNewGroceryItem] = useState("");

    // Function to update a grocery item
    const updateGroceryItem = (id, updatedName) => {
        // Update the groceryItems state from the previous state to the updated one
        setGroceryItems((prevGroceryItem) =>
            //Loop through each item in previous state and create a new array
        prevGroceryItem.map((groceryItem) => 
                //if the groceryItem from the previous state has the same id as the updated one
                // We will merge the new name and update the existing one
                // And if the ids don't math we will leave the groceryItem as is and not change it
                // So basically we will loop through the array of items and only update the one we want
                groceryItem._id === id ? {...groceryItem, name: updatedName} : groceryItem
            )  
        );
    };


    // Function to delete an item 
    const deleteGroceryItem = (id) => {
        // Update the shopping list state
        setGroceryItems((prevGroceryItem) => 
            // Loop through the current items and keep only the grocery items
            //  with a different id than the one input in function
            prevGroceryItem.filter((groceryItem) => groceryItem._id !== id)
        );      
    };

    // Function to add a new grocery item
    const addGroceryItem = () => {
        // If there's no new item entered don't save anything
        if (newGroceryItem.trim() === "") return;
        // Creating a new grocery item wih unique id by using Date.now
        const newGrocery = { _id: Date.now(), name: newGroceryItem };
        // Update the Main GroceryItems state by adding the new grocery item
        setGroceryItems((prevGroceryItem) => [...prevGroceryItem, newGrocery]);
        // Reset the New grocery item state 
        setNewGroceryItem("");
    };

  return (
    <div>
        <h2 className="header-name">Shopping List</h2>
        {/* Loop through each grocery item in groceryItems array */}
        {groceryItems.map((groceryItem) => (
            // For each grocery item we will return a shoppingList component
            <ShoppingList
            key={groceryItem._id}  // Setting a unique key
            groceryItem={groceryItem}  //Passing each item as a prop ShoppingList component
            // Passing the necessary functions to handle deleting and updating items
            updateGroceryItem={updateGroceryItem} 
            deleteGroceryItem={deleteGroceryItem}
            />
        ))}
        {/* Add new grocery item with value the input value from new state */}
        <div className="add-grocery-div">
            <input
                type="text"
                value={newGroceryItem}
                onChange={(event) => setNewGroceryItem(event.target.value)}
                placeholder="Enter item..."
                className="add-item-input"
            />
        {/* Pass handling function for adding grocery item to btn */}
        <button onClick={addGroceryItem} className="add-item-btn">Add</button>
        </div>   
    </div>
  );
}

// Export the ShoppingList page
export default ShoppingListPage;


