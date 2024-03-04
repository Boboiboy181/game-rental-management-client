import axios from 'axios';

const URL = {
  DEPLOY_URL: 'https://game-rental-management-server.onrender.com',
  LOCALHOST: 'http://localhost:3000/',
};
const BASE_URL = URL.DEPLOY_URL;

const api = axios.create({
  withCredentials: true,
  baseURL: BASE_URL,
  headers: {
    'Access-Control-Allow-Origin': 'http://localhost:5173',
    'Access-Control-Allow-Credentials': true,
    Authorization: `Bearer ${sessionStorage.getItem('token')}`,
  },
});

export default api;
