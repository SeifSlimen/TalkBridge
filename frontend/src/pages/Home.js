import React, { useState } from 'react';
import { fetchUsers } from '../services/api';
import './Home.css';

function Home({ token, onLogout }) {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  const handleFetchUsers = async () => {
    setError('');
    try {
      const data = await fetchUsers(token);
      setUsers(data);
    } catch (err) {
      if (err.message === 'Unauthorized') {
        setError('Unauthorized. Please log in again.');
        onLogout();
      } else {
        setError(err.message);
      }
    }
  };

  return (
    <div className="home-container">
      <div className="home-card">
        <h2>Welcome</h2>

        <div className="home-buttons">
          <button className="home-btn logout" onClick={onLogout}>Logout</button>
          <button className="home-btn" onClick={handleFetchUsers}>Fetch Users</button>
        </div>

        {error && <div className="home-error">{error}</div>}

        <ul className="user-list">
          {users.map((u) => (
            <li key={u.id}>
              <strong>{u.name}</strong> <span>{u.email}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Home;
