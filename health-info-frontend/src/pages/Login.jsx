import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginDoctor } from '../services/auth';

const Login = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await loginDoctor(formData);
      navigate('/dashboard');
    } catch (error) {
      alert('Login failed. Check credentials.');
      console.error(error);
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Doctor Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
        /><br /><br />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        /><br /><br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
