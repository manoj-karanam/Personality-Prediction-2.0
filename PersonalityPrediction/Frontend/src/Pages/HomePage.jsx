import React from 'react';
import { Link } from 'react-router-dom';
import './Homepage.css';
import GIF from '../tumblr_n9e2tqxNmn1sbp9hzo1_500.gif';


function HomePage() {
  return (
    <div className="home-container">
      {/* Background GIF as a separate layer */}
      <img className="background-gif" src="https://i0.wp.com/post.greatist.com/wp-content/uploads/sites/2/2020/06/168374-GRT-big-five-personality-traits-1296x728-header-body.gif" alt="Personality Prediction GIF" />
      <div className="overlay-content">
        <h1 className='title'>Discover Your Personality</h1>
        <div className="button-container">
          <Link to="/signin" className="button">Login</Link>
          <Link to="/signup" className="button">Sign Up</Link>
        </div>
      </div>
    </div>
  );
}

export default HomePage;



