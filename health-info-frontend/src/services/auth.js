import axios from 'axios';

export const loginUser = async (credentials) => {
  try {
    const res = await axios.post('http://localhost:5000/api/auth/login', credentials);

    const { token, user } = res.data;

    // Decode token once to extract expiry
    const payload = JSON.parse(atob(token.split('.')[1]));
    const expiry = payload.exp * 1000;

    // Store essentials in localStorage
    localStorage.setItem('token', token);
    localStorage.setItem('role', user.role.toLowerCase());
    localStorage.setItem('username', user.username);
    localStorage.setItem('email', user.email);
    localStorage.setItem('tokenExpiry', expiry);

    // Return only what's needed
    return {
      token,
      role: user.role.toLowerCase(), // make sure it's consistent
    };
  } catch (error) {
    throw error.response?.data || { message: 'Login failed. Try again.' };
  }
};
