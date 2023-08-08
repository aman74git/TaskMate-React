import axios from 'axios';
import BASE_URL from './constant';

const privateAxios = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});
export default privateAxios;
