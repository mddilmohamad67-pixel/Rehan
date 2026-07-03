import axios, { AxiosError, AxiosResponse } from 'axios';
import { auth } from './firebase';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
apiClient.interceptors.request.use(async (config) => {
  try {
    const token = await auth.currentUser?.getIdToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  } catch (error) {
    console.error('Error getting auth token:', error);
  }
  return config;
});

// Handle errors
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      // Redirect to login
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export const apiCall = async <T>(
  method: 'get' | 'post' | 'put' | 'delete',
  endpoint: string,
  data?: any
): Promise<ApiResponse<T>> => {
  try {
    const response = await apiClient[method]<ApiResponse<T>>(
      endpoint,
      data
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      return {
        success: false,
        error: error.response?.data?.error || error.message,
      };
    }
    return {
      success: false,
      error: 'An unexpected error occurred',
    };
  }
};

export default apiClient;
