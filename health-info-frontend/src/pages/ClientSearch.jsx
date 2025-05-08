import React, { useState } from 'react';
import './ClientSearch.css';
import { useNavigate } from 'react-router-dom';

const ClientSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  const handleSearch = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/clients/public-search?name=${searchTerm}`);
      const data = await res.json();
      setResults(data);
    } catch (err) {
      console.error('Error searching clients:', err);
    }
  };

  const viewProfile = (id) => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    } else {
      navigate(`/clients/${id}`);
    }
  };

  return (
    <div className="client-search-container">
      <h2>🔍 Search Clients</h2>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Enter client name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <div className="results">
        {results.length === 0 ? (
          <p>No results found.</p>
        ) : (
          <ul>
            {results.map((client) => (
              <li key={client._id}>
                <div>
                  <strong>{client.name}</strong> — {client.age} yrs, {client.gender}
                </div>
                <button onClick={() => viewProfile(client._id)}>View Full Profile</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ClientSearch;
