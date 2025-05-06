import React, { useState } from 'react';

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
    <div style={{ padding: '2rem' }}>
      <h2>Search Clients</h2>
      <input
        type="text"
        placeholder="Enter client name or ID"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      <ul>
        {results.length === 0 ? (
          <li>No results</li>
        ) : (
          results.map((client) => (
            <li key={client._id}>
              {client.name} – {client.contact}
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default ClientSearch;
