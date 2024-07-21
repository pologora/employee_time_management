import axios from 'axios';

// const BASE_URL = 'https://magazyn-demo-30f1f8a297d3.herokuapp.com/api/v1';
// const BASE_URL = 'https://admin.sntiapp.stronawcal.pl/api/v1';
const BASE_URL = 'https://magazyn-server.webdevolek.stronawcal.pl/api/v1';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export default axiosInstance;
