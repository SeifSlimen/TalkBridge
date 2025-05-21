import React, { useState } from 'react';
import { fetchUsers } from '../services/api';
import '../styles/App.css';
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

  const handleStartMeeting = () => {
  // Generate a unique meeting code (simple random string for now)
  const meetingCode = Math.random().toString(36).substring(2, 10).toUpperCase();
  // Redirect to the meeting room (you'll implement the meeting page later)
  window.location.href = `/meeting/${meetingCode}`;
};

const handleJoinMeeting = () => {
  const code = prompt('Enter the meeting code:');
  if (code && code.trim().length > 0) {
    window.location.href = `/meeting/${code.trim().toUpperCase()}`;
  }
};

  return (
   <div className="home-landing-container">
    <div className="home-landing-card">
      <h1 className="home-title">Welcome to TalkBridge</h1>
      <p className="home-subtitle">Your modern, secure video meeting platform</p>
      <div className="home-actions">
        <button className="home-btn primary" onClick={handleStartMeeting}>Start a New Meeting</button>
        <button className="home-btn" onClick={handleJoinMeeting}>Join a Meeting</button>
     </div>
      <div className="home-info">
        <p>Invite colleagues, friends, or clients to join your meeting room.</p>
        <p>Enjoy real-time video, chat, and collaboration features.</p>
      </div>
      <button className="home-btn logout" onClick={onLogout}>Logout</button>
    </div>
  </div>
  );
}

export default Home;
