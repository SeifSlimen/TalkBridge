import React, { useState } from 'react';
import '../styles/App.css';
function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8081/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await response.json();
      if (data.token) {
        onLogin(data.token);
      } else {
        setError(data.error || 'Login failed');
      }
    } catch (err) {
      setError('Network error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
    <form className="login-form" onSubmit={handleSubmit}>
  <h2>Login</h2>

  <div className="input-group">
    <label>Email</label>
    <input
      type="email"
      placeholder="Email"
      value={email}
      onChange={e => setEmail(e.target.value)}
      required
    />
  </div>

  <div className="input-group">
    <label>Password</label>
    <input
      type="password"
      placeholder="Password"
      value={password}
      onChange={e => setPassword(e.target.value)}
      required
    />
  </div>

  <button className="login-btn" type="submit" disabled={loading}>
    {loading ? 'Logging in...' : 'Login'}
  </button>

  {error && <div className="login-error">{error}</div>}
</form>

    </div>
  );
}

export default Login;
