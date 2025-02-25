// backend/src/types/api.ts
export interface ApiResponse<T = any> {
    status: 'success' | 'error';
    data?: T;
    error?: {
      message: string;
      code?: string;
    };
  }
  
  export interface InsuranceRequest {
    name: string;
    email: string;
    phone: string;
  }
  
  
  export interface ContactRequest {
    name: string;
    email: string;
    message: string;
  }