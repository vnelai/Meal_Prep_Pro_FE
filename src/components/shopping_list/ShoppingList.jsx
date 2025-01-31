//Import Modules
import React, { useState } from 'react'; // Import React and useState

function ShoppingList(groceryItem, updateShoppingItem, deleteShoppingItem) {
    // Track and set if the item is being edited, by toggling between editing and view mode
    const [isEditingMode, setIsEditingMode] = useState(false);
    // Track and set the edited item
    const [editedShoppingItem, setShoppingEditedItem] = useState(groceryItem.name);

    // Function to handle saving the shopping item
    const handleSaving= () => {
        updateShoppingItem(groceryItem._id, editedShoppingItem);  //Update shopping Item passed from parent component
        setIsEditingMode(false); // Reset editing mode to off
    };

    // Function to handle editing a shopping item
    const handleEditing= () => {
        setIsEditingMode(true);
    };

    // Function to handle deleting an item from shopping list
    const handleDeleting= () => {
        deleteShoppingItem(groceryItem._id);  // Delete function passed from parent 
    };

  // Staging elements  
  return (
    <div>
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
            <div>{groceryItem.name}</div>
        )}
        <button onClick={handleEditing}>Edit</button>
        <button onClick={handleDeleting}>Delete</button>
    </div>
  );
};

// Exporting ShoppingList component
export default ShoppingList