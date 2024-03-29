import axios from 'axios';

const BASE_URL = 'https://www.server.snti.pl/api/v1';
// const BASE_URL = 'http://localhost:3000/api/v1';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export default axiosInstance;
