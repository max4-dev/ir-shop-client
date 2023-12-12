import axios from 'axios';

const instance = axios.create({
  // withCredentials: true,
  baseURL: process.env.NEXT_SERVER_DOMAIN,
});

export default instance;