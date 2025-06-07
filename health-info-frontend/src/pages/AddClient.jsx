// src/pages/AddClient.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // ✅ for redirect

const AddClient = () => {
  const [form, setForm] = useState({ name: '', age: '', gender: '', contact: '' });
  const [message, setMessage] = useState('');
  const token = localStorage.getItem('token');
  const navigate = useNavigate(); // ✅ initialize navigation

  const handleChange = (e) => {
  const { name, value } = e.target;

  if (name === 'contact') {
    // Strip out any non-digits
    const digitsOnly = value.replace(/\D/g, '');

    // Only allow up to 10 digits
    if (digitsOnly.length <= 10) {
      setForm({ ...form, contact: digitsOnly });
    }
  } else {
    setForm({ ...form, [name]: value });
  }
};


  const handleSubmit = async (e) => {
  e.preventDefault();

  // Validate contact number before submission
  const { contact } = form;

  if (!/^07\d{8}$/.test(contact)) {
    setMessage('❌ Contact must be 10 digits and start with 07');
    return;
  }

  // Convert to +254 format
  const formattedContact = `+254${contact.slice(1)}`;

  try {
    const res = await axios.post(
      'http://localhost:5000/api/clients',
      { ...form, contact: formattedContact },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    const newClientId = res.data._id;
    setMessage(`✅ Client ${res.data.name} added!`);

    setTimeout(() => {
      navigate(`/clients/${newClientId}/enroll`);
    }, 1000);

    setForm({ name: '', age: '', gender: '', contact: '' });
  } catch (err) {
    setMessage('❌ Failed to add client');
  }
};


  return (
    <div style={styles.container}>
      <button style={styles.backButton} onClick={() => navigate(-1)}>← Back</button>
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
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    top: '1rem',
    left: '1rem',
    background: 'transparent',
    border: 'none',
    fontSize: '1.2rem',
    color: '#333',
    cursor: 'pointer',
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
