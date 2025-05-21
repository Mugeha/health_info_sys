import React from 'react';
import { Link } from 'react-router-dom';
import '../components/Dashboard.css';

const Dashboard = () => {
  const role = localStorage.getItem('role'); // get role stored at login

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">
        Welcome, {role === 'doctor' ? 'Doctor 👨‍⚕️' : role === 'staff' ? 'Staff 🧑‍💼' : 'Admin 🛡️'}
      </h1>

      <div className="dashboard-links">
        {/* Shown to all roles */}
        <Link to="/client-search" className="dashboard-card">🔍 Search Client</Link>

        {/* Doctor-only routes */}
        {role === 'doctor' && (
          <>
            <Link to="/clients" className="dashboard-card">🧑‍🤝‍🧑 View Clients</Link>
            <Link to="/programs" className="dashboard-card">📋 View Programs</Link>
            <Link to="/analytics" className="dashboard-card">📈 View Analytics</Link>
            <Link to="/add-client" className="dashboard-card">➕ Add New Client</Link>
          </>
        )}

        {/* Staff-only routes */}
        {role === 'staff' && (
          <>
            <Link to="/clients" className="dashboard-card">📂 Assigned Clients</Link>
            <Link to="/reports" className="dashboard-card">📝 Submit Reports</Link>
          </>
        )}

        {/* Admin-only routes */}
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
