import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const LoginRedirectGuard = ({ children }) => {
  const token = localStorage.getItem('token');

  if (token) {
    try {
      const decoded = jwtDecode(token);
      const now = Date.now() / 1000;

      console.log("🛑 Token Exp:", decoded.exp, "| Now:", now);

      // Add this fail-safe
      if (!decoded.exp || isNaN(decoded.exp)) {
        console.warn("⚠️ Token invalid. Clearing...");
        localStorage.clear();
        return children;
      }

      if (decoded.exp > now) {
        console.log("🔐 User already logged in. Redirecting to dashboard...");
        return <Navigate to="/dashboard" />;
      } else {
        console.warn("⚠️ Token expired. Clearing localStorage...");
        localStorage.clear();
      }
    } catch (err) {
      console.error("❌ Token decoding failed:", err);
      localStorage.clear();
    }
  }

  return children;
};


export default LoginRedirectGuard;
