// src/pages/AddClient.js
import React, { useState } from 'react';
import axios from 'axios';

function AddClient() {
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
      setMessage(`Client ${res.data.name} added!`);
      setForm({ name: '', age: '', gender: '', contact: '' });
    } catch (err) {
      setMessage('Failed to add client');
    }
  };

  return (
    <div>
      <h2>Add New Client</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
        <input name="age" placeholder="Age" type="number" value={form.age} onChange={handleChange} required />
        <input name="gender" placeholder="Gender" value={form.gender} onChange={handleChange} required />
        <input name="contact" placeholder="Contact" value={form.contact} onChange={handleChange} required />
        <button type="submit">Add Client</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default AddClient;
