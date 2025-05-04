import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import axios from 'axios';

const Clients = () => {
  const [clients, setClients] = useState([]);

  const fetchClients = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:5000/api/clients', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setClients(res.data);
    } catch (err) {
      console.error('Error fetching clients:', err);
      alert('Failed to fetch clients.');
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h2>All Registered Clients</h2>
      <ul>
  {clients.map((client) => (
    <li key={client._id}>
      <Link to={`/clients/${client._id}`}>
        <strong>{client.name}</strong> - {client.nationalId} - {client.gender}
      </Link>
    </li>
  ))}
</ul>

    </div>
  );
};

export default Clients;
