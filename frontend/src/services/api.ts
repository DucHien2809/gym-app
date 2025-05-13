import axios, { AxiosError } from 'axios';
import { ApiResponse } from '../types';

// API base URL
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// Tạo axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000, // Tăng timeout lên 15 giây để đủ thời gian xử lý
  withCredentials: false, // Không gửi cookie
});

// Helper function to handle API errors
const handleApiError = (error: any) => {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<ApiResponse<any>>;
    
    // Handle expired token
    if (axiosError.response?.status === 401) {
      // Only clear token if we're in a browser environment
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
      }
    }
    
    // Try to get a detailed error message from the API response if available
    const errorMessage = axiosError.response?.data?.message || 
                         axiosError.response?.statusText || 
                         'Something went wrong';
    
    return Promise.reject({
      status: 'error',
      message: errorMessage,
      error: {
        status: axiosError.response?.status?.toString() || '500',
        message: errorMessage
      }
    });
  }
  
  return Promise.reject({
    status: 'error',
    message: error.message || 'An unexpected error occurred',
    error: {
      status: '500',
      message: error.message
    }
  });
};

// Interceptor thêm token vào header nếu có
api.interceptors.request.use(
  (config) => {
    // Only access localStorage in a browser environment
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to standardize error handling
api.interceptors.response.use(
  (response) => response,
  (error) => handleApiError(error)
);

// Auth API
export const authAPI = {
  login: async (email: string, password: string) => {
    const response = await api.post<ApiResponse<{ user: any }>>('/auth/login', {
      email,
      password,
    });
    return response.data;
  },

  logout: async () => {
    const response = await api.get<ApiResponse<null>>('/auth/logout');
    return response.data;
  },

  register: async (userData: any) => {
    console.log('API service register called with:', userData);
    try {
      console.log('Making API request to:', `${API_URL}/auth/signup`);
      
      // Use direct axios call instead of api instance to debug
      const response = await axios.post(`${API_URL}/auth/signup`, userData, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });
      
      console.log('API service register response:', response.data);
      return response.data;
    } catch (error) {
      console.error('API service register error details:', error);
      if (axios.isAxiosError(error)) {
        console.error('Response status:', error.response?.status);
        console.error('Response data:', error.response?.data);
        console.error('Error message:', error.message);
      }
      throw error;
    }
  },

  getMe: async () => {
    const response = await api.get<ApiResponse<{ user: any }>>('/auth/me');
    return response.data;
  },
};

// User API
export const userAPI = {
  getAllUsers: async () => {
    const response = await api.get<ApiResponse<{ users: any[] }>>('/users');
    return response.data;
  },

  getUser: async (id: string) => {
    const response = await api.get<ApiResponse<{ user: any }>>(`/users/${id}`);
    return response.data;
  },

  createUser: async (userData: any) => {
    const response = await api.post<ApiResponse<{ user: any }>>('/users', userData);
    return response.data;
  },

  updateUser: async (id: string, userData: any) => {
    const response = await api.patch<ApiResponse<{ user: any }>>(`/users/${id}`, userData);
    return response.data;
  },

  deleteUser: async (id: string) => {
    const response = await api.delete<ApiResponse<null>>(`/users/${id}`);
    return response.data;
  },

  changeUserRole: async (userId: string, role: 'member' | 'trainer') => {
    const response = await api.patch<ApiResponse<{ user: any }>>(`/users/${userId}/role`, { role });
    return response.data;
  },
};

// Membership API
export const membershipAPI = {
  getAllMemberships: async () => {
    const response = await api.get<ApiResponse<{ memberships: any[] }>>('/memberships');
    return response.data;
  },

  getMembership: async (id: string) => {
    const response = await api.get<ApiResponse<{ membership: any }>>(`/memberships/${id}`);
    return response.data;
  },

  createMembership: async (membershipData: any) => {
    const response = await api.post<ApiResponse<{ membership: any }>>('/memberships', membershipData);
    return response.data;
  },

  updateMembership: async (id: string, membershipData: any) => {
    const response = await api.patch<ApiResponse<{ membership: any }>>(`/memberships/${id}`, membershipData);
    return response.data;
  },

  deleteMembership: async (id: string) => {
    const response = await api.delete<ApiResponse<null>>(`/memberships/${id}`);
    return response.data;
  },
};

// Subscription API
export const subscriptionAPI = {
  getAllSubscriptions: async () => {
    const response = await api.get<ApiResponse<{ subscriptions: any[] }>>('/subscriptions');
    return response.data;
  },

  getSubscription: async (id: string) => {
    const response = await api.get<ApiResponse<{ subscription: any }>>(`/subscriptions/${id}`);
    return response.data;
  },

  getMemberSubscriptions: async (memberId: string) => {
    const response = await api.get<ApiResponse<{ subscriptions: any[] }>>(`/subscriptions/member/${memberId}`);
    return response.data;
  },

  createSubscription: async (subscriptionData: any) => {
    const response = await api.post<ApiResponse<{ subscription: any }>>('/subscriptions', subscriptionData);
    return response.data;
  },

  updatePaymentStatus: async (id: string, paymentData: any) => {
    const response = await api.patch<ApiResponse<{ subscription: any }>>(`/subscriptions/${id}`, paymentData);
    return response.data;
  },

  cancelSubscription: async (id: string) => {
    const response = await api.delete<ApiResponse<null>>(`/subscriptions/${id}`);
    return response.data;
  },
};

// Attendance API
export const attendanceAPI = {
  getAllAttendances: async () => {
    const response = await api.get<ApiResponse<{ attendances: any[] }>>('/attendance');
    return response.data;
  },

  getMemberAttendances: async (memberId: string) => {
    const response = await api.get<ApiResponse<{ attendances: any[] }>>(`/attendance/member/${memberId}`);
    return response.data;
  },

  checkIn: async (checkInData: any) => {
    const response = await api.post<ApiResponse<{ attendance: any }>>('/attendance', checkInData);
    return response.data;
  },

  checkOut: async (id: string, checkOutData: any) => {
    const response = await api.patch<ApiResponse<{ attendance: any }>>(`/attendance/${id}`, checkOutData);
    return response.data;
  },

  deleteAttendance: async (id: string) => {
    const response = await api.delete<ApiResponse<null>>(`/attendance/${id}`);
    return response.data;
  },
};

export default api;
