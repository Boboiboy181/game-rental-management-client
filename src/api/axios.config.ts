import axios from 'axios';

const BASE_URL = 'http://localhost:3000/';

const api = axios.create({
  withCredentials: true,
  baseURL: BASE_URL,
  headers: {
    'Access-Control-Allow-Origin': 'http://localhost:5173',
    'Access-Control-Allow-Credentials': true,
  },
});

export default api;
