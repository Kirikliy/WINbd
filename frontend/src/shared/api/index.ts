import axios from 'axios';
import ENV from '@/app/consts/env';

export default axios.create({
  baseURL: ENV.apiUrl,
  timeout: 10000,
  withCredentials: true,
});
