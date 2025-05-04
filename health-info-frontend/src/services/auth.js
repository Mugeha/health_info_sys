import axios from 'axios';

export const loginDoctor = async (credentials) => {
  const res = await axios.post('http://localhost:5000/api/auth/login', credentials);
  localStorage.setItem('token', res.data.token);
  return res.data;
};
