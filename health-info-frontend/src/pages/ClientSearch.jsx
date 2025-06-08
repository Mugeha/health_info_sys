import React, { useState } from 'react';
import './ClientSearch.css';
import { useNavigate } from 'react-router-dom';

const ClientSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false); // 👈 for showing "No results found"
  const navigate = useNavigate();

  const handleSearch = async () => {
    const trimmed = searchTerm.trim();
    if (!trimmed) return;

    setLoading(true);
    setHasSearched(true);

    try {
      const res = await fetch(`http://localhost:5000/api/clients/public-search?name=${trimmed}`);
      const data = await res.json();
      console.log('Search response:', data);

      if (Array.isArray(data)) {
        setResults(data);
      } else {
        console.warn('Unexpected data format:', data);
        setResults([]);
      }
    } catch (err) {
      console.error('Error searching clients:', err);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const viewProfile = (id) => {
    navigate(`/clients/${id}`);
  };

  return (
    <div className="client-search-container">
      <button onClick={() => navigate(-1)} className="back-button">← Back</button>

      <h2>🔍 Search Clients</h2>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Enter client name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      <div className="results">
        {loading ? (
          <p>Loading...</p>
        ) : hasSearched && results.length === 0 ? (
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
