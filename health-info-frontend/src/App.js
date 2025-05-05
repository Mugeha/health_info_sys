import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Clients from './pages/Clients';
import AddClient from './pages/AddClient';
import ClientProfile from './pages/ClientProfile';
import Programs from './pages/Programs';

// ... other imports

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/clients" element={<Clients />} />
        <Route path="/add-client" element={<AddClient />} />
        <Route path="/clients/:id" element={<ClientProfile />} />
        <Route path="/programs" element={<Programs />} />

        {/* Add other routes here */}
      </Routes>
    </Router>
  );
}

export default App;
