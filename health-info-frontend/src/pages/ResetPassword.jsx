import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../components/ResetPassword.css';

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const { token } = useParams();
  const navigate = useNavigate();

  const validatePassword = (password) => {
    const lengthCheck = password.length >= 8;
    const upperCheck = /[A-Z]/.test(password);
    const lowerCheck = /[a-z]/.test(password);
    const numberCheck = /[0-9]/.test(password);
    const specialCheck = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    return lengthCheck && upperCheck && lowerCheck && numberCheck && specialCheck;
  };

  const handleReset = async (e) => {
    e.preventDefault();

    if (!validatePassword(newPassword)) {
      setMessage('Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.');
      return;
    }

    try {
      const res = await axios.post(`http://localhost:5000/api/auth/reset-password/${token}`, {
        newPassword,
      });

      setMessage('✅ Password reset successful! Redirecting...');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Reset failed.');
    }
  };

  return (
    <div className="reset-container">
      <form className="reset-form" onSubmit={handleReset}>
        <h2>Reset Password</h2>
        <input
          type="password"
          placeholder="Enter new password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <button type="submit">Reset</button>
        {message && <p className="message">{message}</p>}
      </form>
    </div>
  );
};

export default ResetPassword;
