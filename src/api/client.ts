import axios from 'axios';
import { DEFAULT_API_BASE_URL } from '../utils/constants';

let rawBaseURL = (import.meta.env.VITE_API_URL || import.meta.env.VITE_API_BASE_URL || DEFAULT_API_BASE_URL).trim();

if (rawBaseURL.endsWith('/')) {
  rawBaseURL = rawBaseURL.slice(0, -1);
}

if (!rawBaseURL.endsWith('/api')) {
  rawBaseURL = `${rawBaseURL}/api`;
}

export const apiClient = axios.create({
  baseURL: rawBaseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 90000, // 90 seconds for deep AI & repository analysis
});

// Automatically attach JWT token to all requests if authenticated
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('repopulse_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle expired or invalid JWT (401 Unauthorized)
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('repopulse_token');
      localStorage.removeItem('repopulse_user');
    }
    return Promise.reject(error);
  }
);
