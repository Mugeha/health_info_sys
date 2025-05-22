import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { Toaster } from 'react-hot-toast';

import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Analytics from './pages/Analytics';
import Clients from './pages/Clients';
import AddClient from './pages/AddClient';
import ClientProfile from './pages/ClientProfile';
import Programs from './pages/Programs';
import PrivateRoute from './pages/PrivateRoute';
import EnrollClient from './pages/EnrollClient';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import ClientSearch from './pages/ClientSearch';
import LoginRedirectGuard from './components/LoginRedirectGuard'; // ✅ new import

function App() {
  return (
    <Router>
      <Toaster position="top-center" reverseOrder={false} />

      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />

        {/* ✅ Redirect logged-in users from login */}
        <Route
          path="/login"
          element={
            <LoginRedirectGuard>
              <Login />
            </LoginRedirectGuard>
          }
        />

        {/* Private Routes */}
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/clients" element={<PrivateRoute><Clients /></PrivateRoute>} />
        <Route path="/analytics" element={<PrivateRoute><Analytics /></PrivateRoute>} />
        <Route path="/add-client" element={<PrivateRoute><AddClient /></PrivateRoute>} />
        <Route path="/clients/:id" element={<PrivateRoute><ClientProfile /></PrivateRoute>} />
        <Route path="/programs" element={<PrivateRoute><Programs /></PrivateRoute>} />
        <Route path="/clients/:id/enroll" element={<PrivateRoute><EnrollClient /></PrivateRoute>} />
        
        <Route path="/client-search" element={<ClientSearch />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
      </Routes>
    </Router>
  );
}

export default App;
