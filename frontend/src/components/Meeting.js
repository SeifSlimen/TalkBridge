import React, { useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/App.css';

function Meeting() {
  const { code } = useParams();
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const [micOn, setMicOn] = useState(true);
  const [camOn, setCamOn] = useState(true);
  const [chat, setChat] = useState([]);
  const [message, setMessage] = useState('');

  // Start local video/audio
  React.useEffect(() => {
    let stream;
    (async () => {
      stream = await navigator.mediaDevices.getUserMedia({
        video: camOn,
        audio: micOn,
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    })();
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [camOn, micOn]);

  const handleToggleMic = () => setMicOn(m => !m);
  const handleToggleCam = () => setCamOn(c => !c);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      setChat([...chat, { sender: 'You', text: message }]);
      setMessage('');
    }
  };

  return (
    <div className="home-landing-container">
      <div className="home-landing-card" style={{ width: 800, minHeight: 500, display: 'flex', flexDirection: 'row', gap: 24 }}>
        {/* Video/Controls/Participants */}
        <div style={{ flex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <h1 className="home-title" style={{ marginBottom: 8 }}>Meeting Room</h1>
          <p className="home-subtitle" style={{ marginBottom: 8 }}>Code: <strong>{code}</strong></p>
          <video
            ref={videoRef}
            autoPlay
            muted
            playsInline
            style={{
              width: 320,
              height: 240,
              background: '#f4f8fb',
              borderRadius: 12,
              marginBottom: 12,
              objectFit: 'cover',
              border: '2px solid #43cea2'
            }}
          />
          <div style={{ display: 'flex', gap: 12, marginBottom: 12 }}>
            <button className="home-btn" onClick={handleToggleMic}>
              {micOn ? 'Mute Mic' : 'Unmute Mic'}
            </button>
            <button className="home-btn" onClick={handleToggleCam}>
              {camOn ? 'Turn Off Camera' : 'Turn On Camera'}
            </button>
          </div>
          <div className="home-info" style={{ marginBottom: 12 }}>
            <p>Share this code to invite others.</p>
            <p>Participant list (coming soon)</p>
          </div>
          <button className="home-btn logout" onClick={() => navigate('/')}>Leave Meeting</button>
        </div>
        {/* Chat Panel */}
        <div style={{
          flex: 1,
          background: '#f4f8fb',
          borderRadius: 12,
          padding: 16,
          display: 'flex',
          flexDirection: 'column',
          height: 400,
          minWidth: 220
        }}>
          <h3 style={{ color: '#185a9d', margin: 0, marginBottom: 8 }}>Chat</h3>
          <div style={{
            flex: 1,
            overflowY: 'auto',
            marginBottom: 8,
            background: '#fff',
            borderRadius: 8,
            padding: 8,
            border: '1px solid #eee'
          }}>
            {chat.length === 0 && <div style={{ color: '#aaa' }}>No messages yet.</div>}
            {chat.map((msg, idx) => (
              <div key={idx} style={{ marginBottom: 4 }}>
                <strong>{msg.sender}:</strong> {msg.text}
              </div>
            ))}
          </div>
          <form onSubmit={handleSendMessage} style={{ display: 'flex', gap: 4 }}>
            <input
              type="text"
              value={message}
              onChange={e => setMessage(e.target.value)}
              placeholder="Type a message..."
              style={{
                flex: 1,
                borderRadius: 6,
                border: '1px solid #ccc',
                padding: 6,
                fontSize: 14
              }}
            />
            <button className="home-btn" type="submit" style={{ padding: '6px 12px' }}>Send</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Meeting;