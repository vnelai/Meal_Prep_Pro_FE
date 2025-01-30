// Import modules
import React from 'react';  // Import React
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import Router and Routes
import './App.css' // Import app css file for styling
import Nav from './components/nav/Nav';  // Import Nav component
import Recipes from './pages/recipes/Recipes';

// App.jsx function 
function App() {
  return (
    <Router>
      <Nav/>
      <Routes>
        {/* Add Home page route */}
        <Route path='/' element={<Home/>}/> 
        {/* Add Recipes page route */}
        <Route path='/recipes' element={<Recipes/>}/>
      </Routes>
    </Router>
  );
};

// Export App function
export default App;
