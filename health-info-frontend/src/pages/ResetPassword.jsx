import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../components/ResetPassword.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
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
      setMessage(
        '❌ Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.'
      );
      return;
    }

    setLoading(true);
    try {
      await axios.post(`http://localhost:5000/api/auth/reset-password/${token}`, {
        newPassword,
      });

      setMessage('✅ Password reset successful! Redirecting...');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setMessage(err.response?.data?.message || '❌ Reset failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="reset-container">
      <form className="reset-form" onSubmit={handleReset}>
        <h2>Reset Password</h2>
        <div className="password-input-container">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <span
            className="toggle-visibility"
            onClick={() => setShowPassword((prev) => !prev)}
            title={showPassword ? 'Hide Password' : 'Show Password'}
          >
            {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
          </span>
        </div>

        <ul className="password-rules">
          <li className={newPassword.length >= 8 ? 'valid' : ''}>✓ At least 8 characters</li>
          <li className={/[A-Z]/.test(newPassword) ? 'valid' : ''}>✓ One uppercase letter</li>
          <li className={/[a-z]/.test(newPassword) ? 'valid' : ''}>✓ One lowercase letter</li>
          <li className={/[0-9]/.test(newPassword) ? 'valid' : ''}>✓ One number</li>
          <li className={/[!@#$%^&*(),.?":{}|<>]/.test(newPassword) ? 'valid' : ''}>
            ✓ One special character
          </li>
        </ul>

        <button type="submit" disabled={loading}>
          {loading ? 'Resetting...' : 'Reset'}
        </button>

        {message && <p className={`message ${message.includes('✅') ? 'success' : 'error'}`}>{message}</p>}
      </form>
    </div>
  );
};

export default ResetPassword;
