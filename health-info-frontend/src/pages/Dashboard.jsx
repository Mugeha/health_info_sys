import React from 'react';
import { Link } from 'react-router-dom';
import '../components/Dashboard.css'; // Link to the CSS file

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Welcome, Doctor 👨‍⚕️</h1>
      <div className="dashboard-links">
        <Link to="/clients" className="dashboard-card">
          🧑‍🤝‍🧑 View Clients
        </Link>
        <Link to="/programs" className="dashboard-card">
          📋 View Programs
        </Link>
        <Link to="/client-search" className="dashboard-card">
          🔍 Search Client (Public)
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
