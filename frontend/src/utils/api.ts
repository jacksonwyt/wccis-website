// frontend/src/utils/api.ts
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// API response types
export interface ApiResponse<T = any> {
  status: 'success' | 'error';
  data?: T;
  error?: {
    message: string;
    code?: string;
  };
}

// Request types
export interface InsuranceQuoteRequest {
  name: string;
  email: string;
  phone: string;
}

export interface CertificateRequest {
  company: string;
  policy: string;
  email: string;
}

export interface ContactRequest {
  name: string;
  email: string;
  message: string;
}

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message = error.response?.data?.error?.message || 'An unexpected error occurred';
    return Promise.reject(new Error(message));
  }
);

// API service functions
export const apiService = {
  // Insurance quote requests
  submitQuoteRequest: async (data: InsuranceQuoteRequest): Promise<ApiResponse> => {
    return apiClient.post('/insure', data);
  },

  // Certificate requests
  submitCertificateRequest: async (data: CertificateRequest): Promise<ApiResponse> => {
    return apiClient.post('/certificate', data);
  },

  // Contact form submissions
  submitContactForm: async (data: ContactRequest): Promise<ApiResponse> => {
    return apiClient.post('/contact', data);
  },

  // Health check
  checkHealth: async (): Promise<ApiResponse> => {
    return apiClient.get('/health');
  },
};