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

// Flag to prevent multiple token fetch requests
let isRefreshingToken = false;
let tokenPromise: Promise<string> | null = null;

// Function to fetch CSRF token
const fetchCsrfToken = async (): Promise<string> => {
  if (isRefreshingToken) {
    return tokenPromise as Promise<string>;
  }

  isRefreshingToken = true;
  tokenPromise = axios
    .get(`${API_URL}/csrf`, { withCredentials: true })
    .then((response) => {
      isRefreshingToken = false;
      return response.data.data.token;
    })
    .catch((error) => {
      isRefreshingToken = false;
      console.error('Failed to fetch CSRF token:', error);
      return '';
    });

  return tokenPromise;
};

// Initialize by fetching a token on page load if in browser
if (typeof window !== 'undefined') {
  fetchCsrfToken().catch(console.error);
}

apiClient.interceptors.request.use(async (config: InternalAxiosRequestConfig) => {
  // Try to get token from cookie first
  let token = typeof document !== 'undefined' 
    ? document.cookie
        .split('; ')
        .find((row) => row.startsWith('XSRF-TOKEN'))
        ?.split('=')[1]
    : null;

  // If no token in cookie and we're making a mutation request, fetch a new token
  if (!token && config.method !== 'get') {
    try {
      token = await fetchCsrfToken();
    } catch (error) {
      console.error('Error fetching CSRF token:', error);
    }
  }

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
    // If we get a 403 with a CSRF error, try to refresh the token once
    if (error?.response?.status === 403 && 
        error?.response?.data?.error?.code === 'CSRF_ERROR') {
      // Clear existing token
      if (typeof document !== 'undefined') {
        document.cookie = 'XSRF-TOKEN=; Max-Age=0; path=/;';
      }
      
      // Could add automatic retry logic here if needed
    }
    
    const message = error?.response?.data?.error?.message || 'An unexpected error occurred';
    return Promise.reject({
      status: 'error',
      error: { message }
    } as ApiResponse);
  }
);

export const submitQuoteRequest = async <T>(data: T): Promise<ApiResponse> => {
  const response = await apiClient.post('/insure', data);
  return response.data;
};

export const submitContactForm = async <T>(data: T): Promise<ApiResponse> => {
  const response = await apiClient.post('/contact', data);
  return response.data;
};

export { apiClient, fetchCsrfToken };