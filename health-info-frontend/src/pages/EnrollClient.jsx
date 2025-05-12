import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

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
        console.log('Fetched programs:', data);
        setPrograms(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error('Error fetching programs:', err);
        setPrograms([]);
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
        alert('✅ Client successfully enrolled!');
        navigate('/clients');
      } else {
        console.error('❌ Enroll failed');
      }
    } catch (err) {
      console.error('❌ Error enrolling client:', err);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>📚 Enroll Client to Program</h2>
        <button
  type="button"
  onClick={() => navigate(-1)}
  style={{
    marginBottom: '1rem',
    padding: '0.5rem 1rem',
    backgroundColor: '#eee',
    border: '1px solid #ccc',
    borderRadius: '4px',
    cursor: 'pointer',
  }}
>
  ← Back
</button>


        {programs.length === 0 ? (
          <p style={styles.loading}>Loading programs...</p>
        ) : (
            
          <form style={styles.form}>
            {programs.map((program) => (
              <label key={program._id} style={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  value={program._id}
                  checked={selectedPrograms.includes(program._id)}
                  onChange={() => handleCheckboxChange(program._id)}
                  style={styles.checkbox}
                />
                {program.name}
              </label>
            ))}

            <button
              type="button"
              onClick={handleEnroll}
              disabled={selectedPrograms.length === 0}
              style={{
                ...styles.button,
                backgroundColor: selectedPrograms.length ? '#4CAF50' : '#ccc',
                cursor: selectedPrograms.length ? 'pointer' : 'not-allowed',
              }}
            >
              🚀 Enroll Selected Programs
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

// 🎨 Basic inline styles (can be swapped out for Tailwind or external CSS)
const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    padding: '2rem',
    backgroundColor: '#f9f9f9',
    minHeight: '100vh',
  },
  card: {
    background: '#fff',
    padding: '2rem',
    borderRadius: '12px',
    boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
    maxWidth: '500px',
    width: '100%',
  },
  title: {
    marginBottom: '1.5rem',
    fontSize: '1.5rem',
    fontWeight: 'bold',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  checkboxLabel: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '1rem',
    gap: '0.5rem',
  },
  checkbox: {
    width: '18px',
    height: '18px',
  },
  button: {
    marginTop: '1.5rem',
    padding: '0.75rem 1rem',
    fontSize: '1rem',
    fontWeight: 'bold',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    transition: 'background-color 0.3s',
  },
  loading: {
    fontStyle: 'italic',
    color: '#888',
  },
};

export default EnrollClient;
