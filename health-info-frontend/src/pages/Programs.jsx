import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Programs.css'; // Don't forget to create this file

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
    <div className="programs-container">
      <h2 className="programs-title">Health Programs</h2>
      {programs.length === 0 ? (
        <p className="no-programs">No programs found.</p>
      ) : (
        <ul className="programs-list">
          {programs.map((program) => (
            <li key={program._id} className="program-card">
              <h3 className="program-name">{program.name}</h3>
              <p className="program-desc">{program.description}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Programs;
