// Import Modules
import React from 'react'  // Import React
import './Hero.css'  // Import css for styling
 // Import Link component, helps with navigation to other pages without triggering full page reload
import { Link } from 'react-router-dom';  


// Hero component function
function Hero() {
  return (
    <section className='hero-section'>
        <div className='hero-text'>
            <h1>Meal Prep made simple, healthy, and fun!</h1>
            <p> Discover delicious recipes and create your perfect meal plan.</p>
            <div className='cta-btns'>
                <Link to="/recipes" className='cta-btn'>Explore Recipes</Link>
                <Link to="/meal-planner" className='cta-btn'>Plan Your Meals</Link>
            </div>
        </div>
    </section>
  );
};


// Export Hero component
export default Hero;