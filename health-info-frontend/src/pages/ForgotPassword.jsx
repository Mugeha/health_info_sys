import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../components/ForgotPassword.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [cooldown, setCooldown] = useState(0); // in seconds

  useEffect(() => {
    let timer;
    if (cooldown > 0) {
      timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [cooldown]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (cooldown > 0) return; // Extra guard

    try {
      const res = await axios.post('http://localhost:5000/api/auth/forgot-password', { email });
      setMessage(res.data.message || 'Check your email for reset instructions.');
      setCooldown(60); // Start 60 second cooldown
    } catch (err) {
      setMessage(err.response?.data?.message || 'Something went wrong.');
    }
  };

  return (
    <div className="forgot-container">
      <form className="forgot-form" onSubmit={handleSubmit}>
        <h2>Forgot Password</h2>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit" disabled={cooldown > 0}>
          {cooldown > 0 ? `Wait ${cooldown}s` : 'Send Reset Link'}
        </button>
        {message && <p className="message">{message}</p>}
        <p className="back-to-login">
          <Link to="/login">← Back to Login</Link>
        </p>
      </form>
    </div>
  );
};

export default ForgotPassword;
