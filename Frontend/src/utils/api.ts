import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Asegúrate de que coincida con tu backend
  headers: {
    'Content-Type': 'application/json',
  },
});

// Agregar interceptor para incluir el token JWT en las solicitudes
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;