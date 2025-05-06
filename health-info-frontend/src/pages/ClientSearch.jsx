import React, { useState } from 'react';
import './ClientSearch.css'; // You can make this file

const ClientSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/clients/search?query=${searchTerm}`);
      const data = await res.json();
      setResults(data);
    } catch (err) {
      console.error('Error searching clients:', err);
    }
  };

  return (
    <div className="client-search-container">
      <h2>🔍 Search Clients</h2>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Enter client name or ID"
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
                <strong>{client.name}</strong> – {client.contact}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ClientSearch;
