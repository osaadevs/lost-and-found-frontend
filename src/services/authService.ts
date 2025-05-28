import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/auth';

export const signup = async (userData: {
  username: string;
  password: string;
  role: string;
}) => {
  return await axios.post(`${API_BASE_URL}/signup`, userData);
};

export const login = async (userData: {
  username: string;
  password: string;
}) => {
  return await axios.post(`${API_BASE_URL}/signin`, userData);
};
