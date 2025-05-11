import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EnrollClient = () => {
  const { id } = useParams(); // client ID
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
        navigate('/clients'); // redirect to clients list or profile
      } else {
        console.error('Enroll failed');
      }
    } catch (err) {
      console.error('Error enrolling client:', err);
    }
  };

  return (
    <div className="enroll-client-container">
      <h2>📚 Enroll Client to Program</h2>
      {programs.length === 0 ? (
        <p>Loading programs...</p>
      ) : (
        <form>
          {programs.map((program) => (
            <div key={program._id}>
              <label>
                <input
                  type="checkbox"
                  value={program._id}
                  checked={selectedPrograms.includes(program._id)}
                  onChange={() => handleCheckboxChange(program._id)}
                />
                {program.name}
              </label>
            </div>
          ))}
          <button type="button" onClick={handleEnroll}>
            Enroll Selected Programs
          </button>
        </form>
      )}
    </div>
  );
};

export default EnrollClient;
