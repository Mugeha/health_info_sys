import React from 'react';
import { Link } from 'react-router-dom';
import '../components/Dashboard.css';

const Dashboard = () => {
  const role = localStorage.getItem('role');

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">
        Welcome, {role === 'admin' ? 'Admin 🛡️' : 'Staff 🧑‍⚕️'}
      </h1>

      <div className="dashboard-links">
        {/* Visible to all roles */}
        <Link to="/client-search" className="dashboard-card">🔍 Search Client</Link>

        {/* Staff & Admin shared actions */}
        {(role === 'staff' || role === 'admin') && (
          <>
            <Link to="/clients" className="dashboard-card">🧑‍🤝‍🧑 View Clients</Link>
            <Link to="/programs" className="dashboard-card">📋 View Programs</Link>
            <Link to="/analytics" className="dashboard-card">📈 View Analytics</Link>
            <Link to="/add-client" className="dashboard-card">➕ Add New Client</Link>
            <Link to="/reports" className="dashboard-card">📝 Submit Reports</Link>
          </>
        )}

        {/* Admin-only actions */}
        {role === 'admin' && (
          <>
            <Link to="/users" className="dashboard-card">👥 Manage Users</Link>
            <Link to="/system-settings" className="dashboard-card">⚙️ System Settings</Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
