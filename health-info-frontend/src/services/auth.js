import axios from 'axios';

export const loginUser = async (credentials) => {
  const res = await axios.post('http://localhost:5000/api/auth/login', credentials);

  // Store token in localStorage
  localStorage.setItem('token', res.data.token);

  // Optionally store role for UI logic (not auth decisions)
  if (res.data.user?.role) {
    localStorage.setItem('role', res.data.user.role);
  }

  return res.data;
};
