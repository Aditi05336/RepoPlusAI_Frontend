import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

export interface User {
  id: number;
  name: string;
  email: string;
  github_username: string;
  created_at?: string;
  updated_at?: string;
}

export interface AuthResponse {
  success: boolean;
  message?: string;
  error?: string;
  user?: User;
  token?: string;
}

export interface SignupData {
  name: string;
  email: string;
  github_username: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export const signupUser = async (data: SignupData): Promise<AuthResponse> => {
  try {
    const response = await axios.post<AuthResponse>(`${API_BASE_URL}/auth/signup`, data);
    return response.data;
  } catch (error: any) {
    if (error.response?.data) {
      return error.response.data;
    }
    return {
      success: false,
      error: error.message || 'Failed to connect to authentication server.',
    };
  }
};

export const loginUser = async (data: LoginData): Promise<AuthResponse> => {
  try {
    const response = await axios.post<AuthResponse>(`${API_BASE_URL}/auth/login`, data);
    return response.data;
  } catch (error: any) {
    if (error.response?.data) {
      return error.response.data;
    }
    return {
      success: false,
      error: error.message || 'Failed to connect to authentication server.',
    };
  }
};

export const logoutUser = async (): Promise<AuthResponse> => {
  try {
    const response = await axios.post<AuthResponse>(`${API_BASE_URL}/auth/logout`);
    return response.data;
  } catch {
    return { success: true };
  }
};

export const getCurrentUser = async (token: string): Promise<AuthResponse> => {
  try {
    const response = await axios.get<AuthResponse>(`${API_BASE_URL}/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    if (error.response?.data) {
      return error.response.data;
    }
    return {
      success: false,
      error: 'Session expired or invalid.',
    };
  }
};
