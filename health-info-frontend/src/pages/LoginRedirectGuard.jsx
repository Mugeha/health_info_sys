import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const LoginRedirectGuard = ({ children }) => {
  const token = localStorage.getItem('token');

  if (token) {
    try {
      const decoded = jwtDecode(token);
      const now = Date.now() / 1000;

      if (decoded.exp > now) {
        return <Navigate to="/dashboard" />;
      } else {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
      }
    } catch (err) {
      localStorage.removeItem('token');
      localStorage.removeItem('role');
    }
  }

  return children;
};

export default LoginRedirectGuard;
