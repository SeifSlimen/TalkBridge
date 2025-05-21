import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Home from './pages/Home';

function App() {
  const [token, setToken] = useState(() => localStorage.getItem('authToken') || null);

  // Save token to localStorage when it changes
  useEffect(() => {
    if (token) {
      localStorage.setItem('authToken', token);
    } else {
      localStorage.removeItem('authToken');
    }
  }, [token]);

  const handleLogin = (newToken) => {
    setToken(newToken);
  };

  const handleLogout = () => {
    setToken(null);
  };

  return (
    <Router>
      <Routes>
        {/* Redirect from "/" to "/login" if no token */}
        <Route
          path="/"
          element={token ? <Home token={token} onLogout={handleLogout} /> : <Navigate to="/login" />}
        />
        <Route
          path="/login"
          element={!token ? <Login onLogin={handleLogin} /> : <Navigate to="/" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
