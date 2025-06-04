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
    let role = localStorage.getItem('role');

    if (!token) {
      toast.error('You need to log in.');
      navigate('/login');
      return;
    }

    try {
      const decoded = jwtDecode(token);
      const now = Date.now() / 1000;

      if (decoded.exp < now) {
        localStorage.clear();
        toast.error('Session expired. Please log in again.');
        navigate('/login');
        return;
      }

      role = role?.toLowerCase();

      if (allowedRoles.length && !allowedRoles.includes(role)) {
        toast.error('Access denied: not authorized for this page.');
        navigate('/unauthorized'); // ✅ Redirect to a proper "unauthorized" page
        return;
      }

      setIsAllowed(true);
    } catch (err) {
      console.error('JWT decoding failed:', err);
      localStorage.clear();
      navigate('/login');
    } finally {
      setIsChecking(false);
    }
  }, [navigate, allowedRoles]);

  if (isChecking) return null;
  return isAllowed ? children : null;
};

export default PrivateRoute;
