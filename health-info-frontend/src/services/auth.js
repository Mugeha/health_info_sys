import axios from 'axios';

export const loginUser = async (credentials) => {
  const res = await axios.post('http://localhost:5000/api/auth/login', credentials);

  // Store token and role in localStorage
  localStorage.setItem('token', res.data.token);
  localStorage.setItem('role', res.data.user.role); // <- for role-based UI

  return res.data;
};
