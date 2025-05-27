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
import LoginRedirectGuard from './pages/LoginRedirectGuard';

function App() {
  return (
    <Router>
      <Toaster position="top-center" reverseOrder={false} />

      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />

        <Route
          path="/login"
          element={
            <LoginRedirectGuard>
              <Login />
            </LoginRedirectGuard>
          }
        />

        {/* Auth + Role-based Routes */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute allowedRoles={['staff', 'admin']}>
              <Dashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/clients"
          element={
            <PrivateRoute allowedRoles={['staff', 'admin']}>
              <Clients />
            </PrivateRoute>
          }
        />

        <Route
          path="/programs"
          element={
            <PrivateRoute allowedRoles={['staff', 'admin']}>
              <Programs />
            </PrivateRoute>
          }
        />

        <Route
          path="/add-client"
          element={
            <PrivateRoute allowedRoles={['staff', 'admin']}>
              <AddClient />
            </PrivateRoute>
          }
        />

        <Route
          path="/analytics"
          element={
            <PrivateRoute allowedRoles={['admin']}>
              <Analytics />
            </PrivateRoute>
          }
        />

        <Route
          path="/clients/:id"
          element={
            <PrivateRoute allowedRoles={['staff', 'admin']}>
              <ClientProfile />
            </PrivateRoute>
          }
        />

        <Route
          path="/clients/:id/enroll"
          element={
            <PrivateRoute allowedRoles={['staff', 'admin']}>
              <EnrollClient />
            </PrivateRoute>
          }
        />

        {/* Public Routes */}
        <Route path="/client-search" element={<ClientSearch />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
      </Routes>
    </Router>
  );
}

export default App;
