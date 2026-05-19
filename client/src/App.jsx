import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import ComplaintForm from './pages/ComplaintForm';
import ComplaintList from './pages/ComplaintList';
import ComplaintStatus from './pages/ComplaintStatus';
import './styles/App.css';

// Simple Private Route Wrapper
const PrivateRoute = ({ children }) => {
  const user = localStorage.getItem('user');
  return user ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/new-complaint" element={<PrivateRoute><ComplaintForm /></PrivateRoute>} />
        <Route path="/complaints" element={<PrivateRoute><ComplaintList /></PrivateRoute>} />
        <Route path="/complaints/:id/status" element={<PrivateRoute><ComplaintStatus /></PrivateRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
