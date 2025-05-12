import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './EnrollClient.css';


const EnrollClient = () => {
  const { id } = useParams();
  const [programs, setPrograms] = useState([]);
  const [selectedPrograms, setSelectedPrograms] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/programs');
        const data = await res.json();
        setPrograms(data);
      } catch (err) {
        console.error('Error fetching programs:', err);
      }
    };

    fetchPrograms();
  }, []);

  const handleCheckboxChange = (programId) => {
    setSelectedPrograms((prev) =>
      prev.includes(programId)
        ? prev.filter((id) => id !== programId)
        : [...prev, programId]
    );
  };

  const handleEnroll = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/clients/${id}/enroll`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ programIds: selectedPrograms }),
      });

      if (res.ok) {
        alert('Client successfully enrolled!');
        navigate('/clients');
      } else {
        console.error('Enroll failed');
      }
    } catch (err) {
      console.error('Error enrolling client:', err);
    }
  };

  return (
    <div className="enroll-client-container">
      <button className="back-button" onClick={() => navigate(-1)}>← Back</button>
      <h2>📚 Enroll Client in Health Programs</h2>
      {programs.length === 0 ? (
        <p>Loading programs...</p>
      ) : (
        <form className="program-form">
          {programs.map((program) => (
            <div key={program._id} className="program-item">
              <label>
                <input
                  type="checkbox"
                  value={program._id}
                  checked={selectedPrograms.includes(program._id)}
                  onChange={() => handleCheckboxChange(program._id)}
                />
                <strong>{program.name}</strong>
              </label>
              <p className="program-description">{program.description}</p>
            </div>
          ))}
          <button type="button" onClick={handleEnroll}>
            ✅ Enroll Selected Programs
          </button>
        </form>
      )}
    </div>
  );
};

export default EnrollClient;
