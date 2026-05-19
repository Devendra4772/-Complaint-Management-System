import axios from 'axios';

const api = axios.create({
  baseURL: 'https://end-backend-vna2.onrender.com',
});

// Interceptor to add JWT token
api.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user && user.token) {
    config.headers.Authorization = `Bearer ${user.token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;
