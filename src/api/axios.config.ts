import axios from 'axios';

const BASE_URL = 'https://game-rental-management-app-yh3ve.ondigitalocean.app/';

const api = axios.create({
  withCredentials: true,
  baseURL: BASE_URL,
});

export default api;
