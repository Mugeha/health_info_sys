import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const LoginRedirectGuard = ({ children }) => {
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      try {
        const decoded = jwtDecode(token);
        const now = Date.now() / 1000;

        console.log("🛑 Token Exp:", decoded.exp, "| Now:", now);

        if (!decoded.exp || isNaN(decoded.exp)) {
          console.warn("⚠️ Invalid token structure. Clearing...");
          localStorage.clear();
        } else if (decoded.exp > now) {
          console.log("🔐 Valid token. Redirecting to dashboard...");
          setShouldRedirect(true);
        } else {
          console.warn("⚠️ Token expired. Clearing localStorage...");
          localStorage.clear();
        }
      } catch (err) {
        console.error("❌ Token decoding failed:", err);
        localStorage.clear();
      }
    }

    setChecked(true);
  }, []);

  if (!checked) return null;
  if (shouldRedirect) return <Navigate to="/dashboard" />;
  return children;
};

export default LoginRedirectGuard;
