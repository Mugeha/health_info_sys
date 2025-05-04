import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ClientProfile = () => {
  const { id } = useParams(); // get client ID from URL
  const [client, setClient] = useState(null);
  const [error, setError] = useState('');
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchClient = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/clients/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setClient(res.data);
      } catch (err) {
        setError('Failed to load client profile');
      }
    };
    fetchClient();
  }, [id, token]);

  if (error) return <p>{error}</p>;
  if (!client) return <p>Loading...</p>;

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Client Profile</h2>
      <p><strong>Name:</strong> {client.name}</p>
      <p><strong>Age:</strong> {client.age}</p>
      <p><strong>Gender:</strong> {client.gender}</p>
      <p><strong>Contact:</strong> {client.contact}</p>
      <h3>Enrolled Programs:</h3>
      <ul>
        {client.enrolledPrograms.length === 0 ? (
          <li>None</li>
        ) : (
          client.enrolledPrograms.map((program) => (
            <li key={program._id}>{program.name}</li>
          ))
        )}
      </ul>
    </div>
  );
};

export default ClientProfile;
