import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Welcome, Doctor 👨‍⚕️</h1>
      <ul>
        <li><Link to="/clients">View Clients</Link></li>
        <li><Link to="/programs">View Programs</Link></li>
        <li><Link to="/client-search">Search Client (Public)</Link></li>
        {/* Add more links as needed */}
      </ul>
    </div>
  );
};

export default Dashboard;
