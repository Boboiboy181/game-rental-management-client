import axios from 'axios';
const URL  ={
  DEPLOY_URL:'https://game-rental-management-app-yh3ve.ondigitalocean.app/',
  LOCALHOST:'http://localhost:3000/',
}
const BASE_URL = URL.LOCALHOST;

const api = axios.create({
  withCredentials: true,
  baseURL: BASE_URL,
  headers: {
    'Access-Control-Allow-Origin': 'http://localhost:5173',
    'Access-Control-Allow-Credentials': true,
  },
});

export default api;
