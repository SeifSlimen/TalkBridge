import React, { useState } from 'react';
import { fetchUsers } from '../services/api';

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
    <div>
      <h2>Welcome to the Home Page</h2>
      <button onClick={onLogout}>Logout</button>
      <button onClick={handleFetchUsers}>Fetch Users (Protected)</button>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <ul>
        {users.map((u) => (
          <li key={u.id}>
            {u.name} ({u.email})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;