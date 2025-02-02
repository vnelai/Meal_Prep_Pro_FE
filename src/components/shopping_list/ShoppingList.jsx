//Import Modules
import React, { useState } from 'react'; // Import React and useState

function ShoppingList({groceryItem, updateGroceryItem, deleteGroceryItem}) {
    // Track and set if the item is being edited, by toggling between editing and view mode
    const [isEditingMode, setIsEditingMode] = useState(false);
    // Track and set the edited item
    const [editedShoppingItem, setShoppingEditedItem] = useState(groceryItem.name);

    // Function to handle the updating and saving the shopping item
    const handleSaving= () => {
        updateGroceryItem(groceryItem._id, editedShoppingItem);  //Update shopping Item passed from parent component
        setIsEditingMode(false); // Reset editing mode to off
    };

    // Function to handle switching from view mode to edit mode
    const handleEditing= () => {
        setIsEditingMode(true);
    };

    // Function to handle deleting an item from shopping list
    const handleDeleting= () => {
        deleteGroceryItem(groceryItem._id);  // Delete function passed from parent 
    };

  // Staging elements  
  return (
    <div>
        {/* If editing mode is on we will show an input field and a save button */}
        {isEditingMode ? (
            <div>
                <input 
                    type="text" 
                    value={editedShoppingItem} 
                    onChange={(event) => setShoppingEditedItem(event.target.value)}
                />
                <button onClick={handleSaving}>Save</button>
            </div>    
        ) : (
            // If editing mode is off we will show the item name with the Edit and Delete buttons
            <div>
                {groceryItem.name}
                <button onClick={handleEditing}>Edit</button>
                <button onClick={handleDeleting}>Delete</button>
            </div>
        )}
        
    </div>
  );
};

// Exporting ShoppingList component
export default ShoppingList;