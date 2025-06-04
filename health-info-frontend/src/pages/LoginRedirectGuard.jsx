import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const LoginRedirectGuard = ({ children }) => {
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      try {
        const decoded = jwtDecode(token);
        const now = Date.now() / 1000;
console.log("🛑 Token Exp:", decoded.exp, "| Now:", now);

if (decoded.exp > now) {
  console.log("🔐 User already logged in. Redirecting to dashboard...");
  return <Navigate to="/dashboard" />;
} else {
  console.warn("⚠️ Token expired. Clearing localStorage...");
  localStorage.clear(); // safer
}

      } catch (err) {
        console.error('❌ Token decode failed:', err);
        localStorage.clear();
      }
    }

    setCheckingAuth(false);
  }, []);

  if (checkingAuth) return null; // Prevent premature render

  if (isAuthenticated) return <Navigate to="/dashboard" />;

  return children;
};

export default LoginRedirectGuard;
