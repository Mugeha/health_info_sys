import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import toast from 'react-hot-toast';

const PrivateRoute = ({ children }) => {
  const navigate = useNavigate();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      navigate('/login');
      return;
    }

    try {
      const decoded = jwt_decode(token);
      const now = Date.now() / 1000; // in seconds

      if (decoded.exp < now) {
        // Token expired
        localStorage.removeItem('token');
        toast.error('Session expired. Please log in again.');
        navigate('/login');
      } else {
        setIsChecking(false); // Safe to render children
      }
    } catch (err) {
      localStorage.removeItem('token');
      navigate('/login');
    }
  }, [navigate]);

  if (isChecking) return null; // Don't flash protected pages briefly

  return children;
};

export default PrivateRoute;
