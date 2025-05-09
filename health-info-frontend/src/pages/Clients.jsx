import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Clients.css'; // Make sure this file exists

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
    <div className="clients-container">
      <h2 className="clients-title">All Registered Clients</h2>
      <ul className="clients-list">
        {clients.map((client) => (
          <li key={client._id} className="client-item">
            <Link to={`/clients/${client._id}`} className="client-link">
              <strong>{client.name}</strong> — {client.nationalId} — {client.gender}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Clients;
