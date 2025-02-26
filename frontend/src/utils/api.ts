// frontend/src/utils/api.ts
import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse } from 'axios';

export interface ApiResponse<T = any> {
  status: 'success' | 'error';
  data?: T;
  error?: {
    message: string;
    code?: string;
  };
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const apiClient: AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

apiClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = document.cookie
    .split('; ')
    .find((row) => row.startsWith('XSRF-TOKEN'))
    ?.split('=')[1];

  if (token && config.headers) {
    config.headers['X-XSRF-TOKEN'] = token;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    const apiResponse: ApiResponse = {
      status: 'success',
      data: response.data
    };
    return { ...response, data: apiResponse };
  },
  (error: any) => {
    const message = error?.response?.data?.error?.message || 'An unexpected error occurred';
    return Promise.reject({
      status: 'error',
      error: { message }
    } as ApiResponse);
  }
);

// Note: The submitQuoteRequest and submitContactForm functions have been removed
// as they're no longer needed with the email client approach

export { apiClient };