import axios from 'axios';

export const loginUser = async (credentials) => {
  const res = await axios.post('http://localhost:5000/api/auth/login', credentials);

  localStorage.setItem('token', res.data.token);
  localStorage.setItem('role', res.data.user.role);

  // 🔥 Auto logout setup based on token expiry
  const payload = JSON.parse(atob(res.data.token.split('.')[1]));
  const expiry = payload.exp * 1000;
  localStorage.setItem('tokenExpiry', expiry);

  return res.data;
};

