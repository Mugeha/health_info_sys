import { Navigate } from 'react-router-dom';

const LoginRedirectGuard = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? <Navigate to="/dashboard" /> : children;
};

export default LoginRedirectGuard;
