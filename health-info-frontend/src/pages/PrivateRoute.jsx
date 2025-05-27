import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import toast from 'react-hot-toast';

const PrivateRoute = ({ children, allowedRoles = [] }) => {
  const navigate = useNavigate();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    if (!token) {
      navigate('/login');
      return;
    }

    try {
      const decoded = jwtDecode(token);
      const now = Date.now() / 1000;

      if (decoded.exp < now) {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        toast.error('Session expired. Please log in again.');
        navigate('/login');
        return;
      }

      // Check if role is allowed
      if (allowedRoles.length && !allowedRoles.includes(role)) {
        toast.error('Access denied.');
        navigate('/dashboard');
        return;
      }

      setIsChecking(false);
    } catch (err) {
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      navigate('/login');
    }
  }, [navigate, allowedRoles]);

  if (isChecking) return null;

  return children;
};


export default PrivateRoute;
