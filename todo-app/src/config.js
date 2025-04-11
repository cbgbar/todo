import axios from 'axios';

export const API_KEY = '12345';
export const API_URL = 'http://localhost:9090/api/v1/todos';

const api = axios.create({
  baseURL: API_URL,
  params: {
    apiKey: API_KEY, // Thêm query parameter apiKey
  },
});

export default api;