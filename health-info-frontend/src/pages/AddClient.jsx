// src/pages/AddClient.jsx
import React, { useState } from 'react';
import axios from 'axios';

const AddClient = () => {
  const [form, setForm] = useState({ name: '', age: '', gender: '', contact: '' });
  const [message, setMessage] = useState('');
  const token = localStorage.getItem('token');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/clients', form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage(`✅ Client ${res.data.name} added!`);
      setForm({ name: '', age: '', gender: '', contact: '' });
    } catch (err) {
      setMessage('❌ Failed to add client');
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Add New Client</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          style={styles.input}
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          style={styles.input}
          name="age"
          placeholder="Age"
          type="number"
          value={form.age}
          onChange={handleChange}
          required
        />
        <input
          style={styles.input}
          name="gender"
          placeholder="Gender"
          value={form.gender}
          onChange={handleChange}
          required
        />
        <input
          style={styles.input}
          name="contact"
          placeholder="Contact Info"
          value={form.contact}
          onChange={handleChange}
          required
        />
        <button type="submit" style={styles.button}>Add Client</button>
      </form>
      {message && <p style={styles.message}>{message}</p>}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '500px',
    margin: '3rem auto',
    padding: '2rem',
    background: '#f9f9f9',
    borderRadius: '10px',
    boxShadow: '0 0 12px rgba(0,0,0,0.1)',
  },
  heading: {
    textAlign: 'center',
    marginBottom: '1.5rem',
    fontSize: '1.8rem',
    color: '#333',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  input: {
    padding: '0.75rem',
    border: '1px solid #ccc',
    borderRadius: '6px',
    fontSize: '1rem',
  },
  button: {
    padding: '0.8rem',
    backgroundColor: '#4CAF50',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    fontSize: '1rem',
    cursor: 'pointer',
  },
  message: {
    marginTop: '1rem',
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#444',
  },
};

export default AddClient;
