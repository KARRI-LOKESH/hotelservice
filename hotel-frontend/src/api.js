import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:8081',
  withCredentials: true,  // needed if you allow credentials in Spring
});

export default API;
