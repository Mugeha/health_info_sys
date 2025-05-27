import axios from 'axios';

export const loginUser = async (credentials) => {
  try {
    const res = await axios.post('http://localhost:5000/api/auth/login', credentials);

    const { token, user } = res.data;

    localStorage.setItem('token', token);
    localStorage.setItem('role', user.role);
    localStorage.setItem('username', user.username);
    localStorage.setItem('email', user.email);

    const payload = JSON.parse(atob(token.split('.')[1]));
    const expiry = payload.exp * 1000;
    localStorage.setItem('tokenExpiry', expiry);

    return res.data;
  } catch (error) {
    throw error.response?.data || { message: 'Login failed. Try again.' };
  }
};


