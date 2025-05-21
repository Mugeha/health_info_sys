import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/auth'; // updated import
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import '../components/Login.css';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    role: 'doctor' // default role
  });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const togglePassword = () => {
    setShowPassword(prev => !prev);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await loginUser(formData); // using updated function
      navigate('/dashboard');
    } catch (error) {
      toast.error('Login failed. Check your credentials.', {
        position: 'top-right',
        autoClose: 3000,
      });
      console.error(error);
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h2 className="login-title">Login</h2>

        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
          className="login-input"
        />

        <div className="password-wrapper">
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="login-input"
          />
          <span className="toggle-password" onClick={togglePassword}>
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        {/* Role Selector */}
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          required
          className="login-input"
        >
          <option value="doctor">Doctor</option>
          <option value="staff">Staff</option>
          <option value="admin">Admin</option>
        </select>

        <p className="forgot-password-text">
          <a href="/forgot-password">Forgot Password?</a>
        </p>

        <button type="submit" className="login-button">Login</button>
      </form>

      <ToastContainer />
    </div>
  );
};

export default Login;
