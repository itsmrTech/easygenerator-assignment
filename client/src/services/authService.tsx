// src/services/authService.ts
import axios from 'axios';

const API_URL = 'http://localhost:3000/auth';  // Backend API

export const signup = async (email: string, password: string, name: string) => {
  return axios.post(`${API_URL}/signup`, { email, password, name });
};

export const signin = async (email: string, password: string) => {
  return axios.post(`${API_URL}/signin`, { email, password });
};