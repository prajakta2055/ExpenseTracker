import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/home.css'; // Import the CSS file

function Home() {
  return (
    <div className="container">
      <h1>Welcome to Expense Tracker</h1>
      <p>Please select an option:</p>
      <div>
        <Link to="/login">Login</Link> | <Link to="/register">Register</Link>
      </div>
    </div>
  );
}

export default Home;
