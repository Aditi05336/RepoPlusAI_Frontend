import axios from 'axios';
import { DEFAULT_API_BASE_URL } from '../utils/constants';

const baseURL = import.meta.env.VITE_API_URL || import.meta.env.VITE_API_BASE_URL || DEFAULT_API_BASE_URL;

export const apiClient = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 90000, // 90 seconds for deep AI & repository analysis
});
