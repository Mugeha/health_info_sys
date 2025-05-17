import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

import axios from 'axios';
import '../components/ClientProfile.css';

const ClientProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [client, setClient] = useState(null);
  const [error, setError] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false); // 🔥 state for modal

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      navigate('/login');
      return;
    }

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
  }, [id, navigate]);

  const handleDelete = async () => {
  const token = localStorage.getItem('token');

  try {
    await axios.delete(`http://localhost:5000/api/clients/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setShowDeleteModal(false);
    toast.success('Client deleted successfully'); // 🍞 toast instead of alert
    navigate('/clients');
  } catch (err) {
    console.error('Delete error:', err);
    toast.error('Failed to delete client.');
  }
};

  if (error) return <p className="error-message">{error}</p>;
  if (!client) return <p className="loading-message">Loading...</p>;

  return (
    <div className="profile-container">
      <button className="back-button" onClick={() => navigate(-1)}>← Back</button>
      <h2 className="profile-title">Client Profile</h2>
      <p><strong>Name:</strong> {client.name}</p>
      <p><strong>Age:</strong> {client.age}</p>
      <p><strong>Gender:</strong> {client.gender}</p>
      <p><strong>Contact:</strong> {client.contact}</p>

      <h3 className="program-title">Enrolled Programs:</h3>
      <ul>
        {client.enrolledPrograms.length === 0 ? (
          <li>None</li>
        ) : (
          client.enrolledPrograms.map((program) => (
            <li key={program._id}>{program.name}</li>
          ))
        )}
      </ul>

      <button className="delete-button" onClick={() => setShowDeleteModal(true)}>🗑️ Delete Client</button>

      {showDeleteModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <p>Are you sure you want to delete this client?</p>
            <div className="modal-actions">
              <button onClick={handleDelete} className="confirm-delete">Yes, Delete</button>
              <button onClick={() => setShowDeleteModal(false)} className="cancel-delete">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientProfile;
