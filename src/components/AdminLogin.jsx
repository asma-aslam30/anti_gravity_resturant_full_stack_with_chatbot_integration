import React, { useState } from 'react';
import { Lock, ChevronRight, UserPlus } from 'lucide-react';
import './Admin.css';

const AdminLogin = ({ onLogin }) => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const endpoint = isRegistering ? '/api/auth/register' : '/api/auth/login';
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';

    try {
      const response = await fetch(`${apiUrl}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      if (isRegistering) {
        alert('Registration successful! Please login.');
        setIsRegistering(false);
      } else {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        onLogin();
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-container">
      <div className="admin-login-card">
        <div className="admin-icon">
          <Lock size={32} />
        </div>
        <h2>{isRegistering ? 'Create Admin' : 'Admin Access'}</h2>
        <p>{isRegistering ? 'Set up your admin account' : 'Enter credentials to access dashboard'}</p>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              required
              autoFocus
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
          </div>
          
          {error && <div className="error-message">{error}</div>}
          
          <button type="submit" className="btn-login" disabled={loading}>
            {loading ? 'Processing...' : (isRegistering ? 'Register' : 'Login')} 
            {!loading && <ChevronRight size={16} />}
          </button>

          <button 
            type="button" 
            className="btn-link"
            onClick={() => {
              setIsRegistering(!isRegistering);
              setError('');
            }}
          >
            {isRegistering ? 'Back to Login' : 'Create new account'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
