import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Clients from './pages/Clients';
import AddClient from './pages/AddClient';
import ClientProfile from './pages/ClientProfile';
import Programs from './pages/Programs';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/clients"
          element={
            <PrivateRoute>
              <Clients />
            </PrivateRoute>
          }
        />
        <Route
          path="/add-client"
          element={
            <PrivateRoute>
              <AddClient />
            </PrivateRoute>
          }
        />
        <Route
          path="/clients/:id"
          element={
            <PrivateRoute>
              <ClientProfile />
            </PrivateRoute>
          }
        />
        <Route
          path="/programs"
          element={
            <PrivateRoute>
              <Programs />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
