import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import toast from 'react-hot-toast';

const PrivateRoute = ({ children, allowedRoles = [] }) => {
  const navigate = useNavigate();
  const [isChecking, setIsChecking] = useState(true);
  const [isAllowed, setIsAllowed] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      toast.error('You need to log in.');
      return navigate('/login');
    }

    try {
      const decoded = jwtDecode(token);
      const now = Date.now() / 1000;

      if (!decoded.exp || isNaN(decoded.exp) || decoded.exp < now) {
        localStorage.clear();
        toast.error('Session expired. Please log in again.');
        return navigate('/login');
      }

      const storedRole = localStorage.getItem('role')?.toLowerCase();

      if (allowedRoles.length && !allowedRoles.includes(storedRole)) {
        toast.error('Access denied: Not authorized.');
        return navigate('/unauthorized');
      }

      setIsAllowed(true);
    } catch (err) {
      console.error('❌ Token decoding failed:', err);
      localStorage.clear();
      navigate('/login');
    } finally {
      setIsChecking(false);
    }
  }, [navigate, allowedRoles]);

  if (isChecking) return null; // Or show a loader like: <div>Loading...</div>
  return isAllowed ? children : null;
};

export default PrivateRoute;
