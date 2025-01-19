import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './Dashboard';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import Login from './pages/Login';
import SignUp from './pages/SignUp';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const token = Cookies.get('accessToken');
  
  if (!token) {
    // Redirect to login if there's no token
    return <Navigate to="/login" replace />;
  }

  return children;
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = Cookies.get('accessToken');
    setIsAuthenticated(!!token);
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route 
          path="/" 
          element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Login />} 
        />
        <Route 
          path="/signup" 
          element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <SignUp />} 
        />
        
        {/* Protected Dashboard Route */}
        <Route
          path="/dashboard"
          element={
              <Dashboard />
          }
        />

        {/* Redirect root to dashboard if authenticated, otherwise to login */}
        <Route
          path="/"
          element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />}
        />

        {/* Catch all route for non-existing pages */}
        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;