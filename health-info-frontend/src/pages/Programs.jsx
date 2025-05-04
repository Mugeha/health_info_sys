// src/pages/Programs.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Programs = () => {
  const [programs, setPrograms] = useState([]);

  const fetchPrograms = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:5000/api/programs', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPrograms(res.data);
    } catch (err) {
      console.error('Error fetching programs:', err);
      alert('Failed to load programs');
    }
  };

  useEffect(() => {
    fetchPrograms();
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Health Programs</h2>
      {programs.length === 0 ? (
        <p>No programs found.</p>
      ) : (
        <ul>
          {programs.map((program) => (
            <li key={program._id}>
              <strong>{program.name}</strong> - {program.description}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Programs;
