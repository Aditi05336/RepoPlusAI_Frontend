import { apiClient } from './client';

export interface User {
  id: number;
  name: string;
  email: string;
  github_username: string;
  username?: string;
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
    const response = await apiClient.post<AuthResponse>('/auth/signup', data);
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
    const response = await apiClient.post<AuthResponse>('/auth/login', data);
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
    const response = await apiClient.post<AuthResponse>('/auth/logout');
    return response.data;
  } catch {
    return { success: true };
  }
};

export const getCurrentUser = async (token: string): Promise<AuthResponse> => {
  try {
    const response = await apiClient.get<AuthResponse>('/auth/me', {
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

export const updateUsername = async (token: string, username: string): Promise<AuthResponse> => {
  try {
    const response = await apiClient.put<AuthResponse>(
      '/auth/username',
      { username },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
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

