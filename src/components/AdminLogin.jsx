import React, { useState } from 'react';
import { Lock, ChevronRight } from 'lucide-react';
import './Admin.css';

const AdminLogin = ({ onLogin }) => {
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simple PIN for demonstration - in production use proper auth
    if (pin === '1234') {
      onLogin();
    } else {
      setError('Invalid PIN');
      setPin('');
    }
  };

  return (
    <div className="admin-login-container">
      <div className="admin-login-card">
        <div className="admin-icon">
          <Lock size={32} />
        </div>
        <h2>Admin Access</h2>
        <p>Enter PIN to access dashboard</p>
        
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            value={pin}
            onChange={(e) => {
              setPin(e.target.value);
              setError('');
            }}
            placeholder="Enter PIN (1234)"
            maxLength="4"
            autoFocus
          />
          {error && <div className="error-message">{error}</div>}
          <button type="submit" className="btn-login">
            Access Dashboard <ChevronRight size={16} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
