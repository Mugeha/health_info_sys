import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ClientProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
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

  if (error) return <p className="text-red-500 p-4">{error}</p>;
  if (!client) return <p className="p-4">Loading...</p>;

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white shadow rounded-md">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        ← Back
      </button>

      <h2 className="text-2xl font-bold mb-4">Client Profile</h2>
      <div className="space-y-2">
        <p><span className="font-semibold">Name:</span> {client.name}</p>
        <p><span className="font-semibold">Age:</span> {client.age}</p>
        <p><span className="font-semibold">Gender:</span> {client.gender}</p>
        <p><span className="font-semibold">Contact:</span> {client.contact}</p>
      </div>

      <h3 className="text-xl font-semibold mt-6 mb-2">Enrolled Programs:</h3>
      <ul className="list-disc list-inside">
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
