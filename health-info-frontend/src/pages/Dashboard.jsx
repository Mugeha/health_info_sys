import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import toast from 'react-hot-toast';
import '../components/Dashboard.css';

const Dashboard = () => {
  const role = localStorage.getItem('role');
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  // Manual logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    toast.success('Logged out successfully');
    navigate('/login');
  };

  // Auto logout on token expiry
  useEffect(() => {
    if (!token) return;

    try {
const decoded = jwtDecode(token);
      const now = Date.now() / 1000; // Current time in seconds
      const timeUntilExpiry = (decoded.exp - now) * 1000;

      if (timeUntilExpiry <= 0) {
        handleLogout();
      } else {
        const timeoutId = setTimeout(() => {
          toast.error('Session expired. Please log in again.');
          handleLogout();
        }, timeUntilExpiry);

        return () => clearTimeout(timeoutId); // Cleanup
      }
    } catch (error) {
      handleLogout(); // Invalid token
    }
  }, [token]);

  return (
    <div className="dashboard-container">
  <div className="dashboard-header">
    <h1 className="dashboard-title">
      Welcome, {role === 'admin' ? 'Admin 🛡️' : 'Staff 🧑‍⚕️'}
    </h1>
    <button onClick={handleLogout} className="logout-button">🚪 Logout</button>
  </div>

  <div className="dashboard-links">
    <Link to="/client-search" className="dashboard-card">🔍 Search Client</Link>
    {(role === 'staff' || role === 'admin') && (
      <>
        <Link to="/clients" className="dashboard-card">🧑‍🤝‍🧑 View Clients</Link>
        <Link to="/programs" className="dashboard-card">📋 View Programs</Link>
        <Link to="/analytics" className="dashboard-card">📈 View Analytics</Link>
        <Link to="/add-client" className="dashboard-card">➕ Add New Client</Link>
      </>
    )}
  </div>
</div>

  );
};

export default Dashboard;
