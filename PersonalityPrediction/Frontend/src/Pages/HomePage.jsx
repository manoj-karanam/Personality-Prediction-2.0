import React from 'react';
import { Link } from 'react-router-dom';
import './Homepage.css';

function HomePage() {
  return (
    <div className="home-container">
      <header className="home-header">
        {/* Replace button elements with Link components */}
        <Link to="/signin" className="button">Login</Link>
        <Link to="/signup" className="button">Sign Up</Link>
      </header>
      <main className="home-main">
        <h1>Personality Prediction</h1>
        <img src="https://ey9rnjyx97u.exactdn.com/wp-content/uploads/2023/04/tesocraderek_creative_designer_robot_chat_robot_yellow_black_wh_0c87d726-e636-4eb9-919f-054d0152ae87.png" alt="Personality Prediction" />
      </main>
    </div>
  );
}

export default HomePage;
