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
