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
  console.log('handleApiError: Original error:', error);
  
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
    
    const customError = {
      status: 'error',
      message: errorMessage,
      error: {
        status: axiosError.response?.status?.toString() || '500',
        message: errorMessage
      },
      // Preserve original error information for debugging
      originalError: error,
      axiosDetails: {
        status: axiosError.response?.status,
        statusText: axiosError.response?.statusText,
        data: axiosError.response?.data,
        config: {
          method: axiosError.config?.method,
          url: axiosError.config?.url,
          headers: axiosError.config?.headers
        }
      }
    };
    
    console.log('handleApiError: Transformed axios error:', customError);
    return Promise.reject(customError);
  }
  
  const customError = {
    status: 'error',
    message: error.message || 'An unexpected error occurred',
    error: {
      status: '500',
      message: error.message
    },
    originalError: error
  };
  
  console.log('handleApiError: Transformed non-axios error:', customError);
  return Promise.reject(customError);
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
    console.log(`Attempting login with email: ${email} to ${API_URL}/auth/login`);
    try {
      const response = await api.post<ApiResponse<{ user: any }>>('/auth/login', {
        email,
        password,
      });
      console.log('Login response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Login error:', error);
      if (axios.isAxiosError(error)) {
        console.error('Response status:', error.response?.status);
        console.error('Response data:', error.response?.data);
      }
      throw error;
    }
  },

  logout: async () => {
    const response = await api.get<ApiResponse<null>>('/auth/logout');
    return response.data;
  },

  register: async (userData: any) => {
    console.log('API service register called with:', userData);
    try {
      // Use the api instance with proper error handling instead of direct axios
      const response = await api.post<ApiResponse<{ user: any }>>('/auth/signup', userData);
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

  getAllTrainers: async () => {
    const response = await api.get<ApiResponse<{ trainers: any[] }>>('/users/trainers');
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

  updatePassword: async (userId: string, passwordData: { currentPassword: string, newPassword: string }) => {
    const response = await api.patch<ApiResponse<null>>(`/users/${userId}/password`, passwordData);
    return response.data;
  },

  resetPassword: async (userId: string, newPassword?: string) => {
    const response = await api.post<ApiResponse<{ user: any; newPassword: string }>>(`/users/${userId}/reset-password`, { newPassword });
    return response.data;
  },
};

// Upload API
export const uploadAPI = {
  uploadProfileImage: async (imageFile: File) => {
    const formData = new FormData();
    formData.append('image', imageFile);
    
    const response = await api.post<ApiResponse<{ filename: string; originalName: string; url: string; size: number }>>('/upload/profile-image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  uploadFile: async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await api.post<ApiResponse<{ filename: string; originalName: string; url: string; size: number }>>('/upload/file', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
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

// Equipment API
export const equipmentAPI = {
  getAllEquipment: async (params?: { 
    category?: string;
    status?: string;
    search?: string;
    page?: number;
    limit?: number;
    sort?: string;
    order?: 'asc' | 'desc';
  }) => {
    const response = await api.get<ApiResponse<{ equipment: any[] }>>('/equipment', { params });
    return response.data;
  },

  getEquipment: async (id: string) => {
    const response = await api.get<ApiResponse<{ equipment: any }>>(`/equipment/${id}`);
    return response.data;
  },

  createEquipment: async (equipmentData: any) => {
    const response = await api.post<ApiResponse<{ equipment: any }>>('/equipment', equipmentData);
    return response.data;
  },

  updateEquipment: async (id: string, equipmentData: any) => {
    const response = await api.patch<ApiResponse<{ equipment: any }>>(`/equipment/${id}`, equipmentData);
    return response.data;
  },

  deleteEquipment: async (id: string) => {
    const response = await api.delete<ApiResponse<null>>(`/equipment/${id}`);
    return response.data;
  },

  // Maintenance logs
  getMaintenanceLogs: async (equipmentId: string, params?: {
    status?: string;
    page?: number;
    limit?: number;
    sort?: string;
    order?: 'asc' | 'desc';
  }) => {
    const response = await api.get<ApiResponse<{ maintenanceLogs: any[] }>>(`/equipment/${equipmentId}/maintenance`, { params });
    return response.data;
  },

  getMaintenanceLog: async (id: string) => {
    const response = await api.get<ApiResponse<{ maintenanceLog: any }>>(`/equipment/maintenance/${id}`);
    return response.data;
  },

  createMaintenanceLog: async (equipmentId: string, maintenanceData: any) => {
    const response = await api.post<ApiResponse<{ maintenanceLog: any }>>(`/equipment/${equipmentId}/maintenance`, maintenanceData);
    return response.data;
  },

  updateMaintenanceLog: async (id: string, maintenanceData: any) => {
    const response = await api.patch<ApiResponse<{ maintenanceLog: any }>>(`/equipment/maintenance/${id}`, maintenanceData);
    return response.data;
  },

  deleteMaintenanceLog: async (id: string) => {
    const response = await api.delete<ApiResponse<null>>(`/equipment/maintenance/${id}`);
    return response.data;
  },
};

// Dashboard API
export const dashboardAPI = {
  getAdminDashboardStats: async () => {
    interface AdminDashboardResponse {
      stats: {
        totalMembers: number;
        activeSubscriptions: number;
        totalRevenue: number;
        totalRefunds: number;
        netRevenue: number;
        monthlyRevenue: number;
        pendingCancellations: number;
        totalEquipment: number;
      };
      recentTransactions: Array<{
        id: string;
        type: 'revenue' | 'refund';
        memberName: string;
        membershipName: string;
        amount: number;
        date: string;
        description: string;
      }>;
    }
    
    try {
      console.log('API service: About to call /dashboard/admin endpoint...');
      
      // Make the request using axios directly to bypass interceptors and see raw error
      const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
      const headers: any = {
        'Content-Type': 'application/json',
      };
      
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }
      
      const response = await axios.get(`${API_URL}/dashboard/admin`, {
        headers,
        timeout: 15000,
      });
      
      console.log('API service: Received response:', response.data);
      return response.data;
    } catch (error: any) {
      console.error('API service: Raw axios error caught:', error);
      console.error('API service: Error message:', error.message);
      console.error('API service: Error response:', error.response);
      console.error('API service: Error request:', error.request);
      console.error('API service: Error config:', error.config);
      
      if (error.response) {
        console.error('API service: Response status:', error.response.status);
        console.error('API service: Response data:', error.response.data);
        console.error('API service: Response headers:', error.response.headers);
        
        // Create a detailed error object
        const detailedError = {
          status: 'error',
          message: error.response.data?.message || error.message || 'API call failed',
          httpStatus: error.response.status,
          responseData: error.response.data,
          url: error.config?.url,
        };
        
        throw detailedError;
      } else if (error.request) {
        console.error('API service: No response received');
        throw {
          status: 'error',
          message: 'Không thể kết nối đến server',
          httpStatus: 0,
        };
      } else {
        console.error('API service: Request setup error');
        throw {
          status: 'error',
          message: error.message || 'Lỗi khi thiết lập request',
          httpStatus: 0,
        };
      }
    }
  },

  getTrainerDashboardStats: async () => {
    interface DashboardResponse {
      stats: {
        totalMembers: number;
        activeMembers: number;
        todayCheckIns: number;
        upcomingSessions: number;
      };
      upcomingAppointments: Array<{
        id: string;
        memberName: string;
        time: string;
        date: string;
        type: string;
      }>;
      recentActivities: Array<{
        id: string;
        memberName: string;
        action: string;
        time: string;
      }>;
      memberAlerts: Array<{
        id: string;
        memberName: string;
        issue: string;
        priority: 'high' | 'medium' | 'low';
      }>;
    }
    
    const response = await api.get<ApiResponse<DashboardResponse>>('/dashboard/trainer');
    return response.data;
  },
};

// Cancellation API
export const cancellationAPI = {
  getAllCancellationRequests: async () => {
    const response = await api.get<ApiResponse<{ cancellationRequests: any[] }>>('/cancellations');
    return response.data;
  },

  getMemberCancellationRequests: async (memberId: string) => {
    const response = await api.get<ApiResponse<{ cancellationRequests: any[] }>>(`/cancellations/member/${memberId}`);
    return response.data;
  },

  requestCancellation: async (cancellationData: any) => {
    const response = await api.post<ApiResponse<{ cancellationRequest: any }>>('/cancellations', cancellationData);
    return response.data;
  },

  processCancellationRequest: async (id: string, processingData: any) => {
    const response = await api.patch<ApiResponse<{ cancellationRequest: any }>>(`/cancellations/${id}`, processingData);
    return response.data;
  }
};

// Appointment API
export const appointmentAPI = {
  getAllAppointments: async () => {
    const response = await api.get<ApiResponse<{ appointments: any[] }>>('/appointments');
    return response.data;
  },

  getMemberAppointments: async (memberId: string) => {
    const response = await api.get<ApiResponse<{ appointments: any[] }>>(`/appointments/member/${memberId}`);
    return response.data;
  },

  getTrainerAppointments: async (trainerId: string) => {
    const response = await api.get<ApiResponse<{ appointments: any[] }>>(`/appointments/trainer/${trainerId}`);
    return response.data;
  },

  createAppointment: async (appointmentData: any) => {
    const response = await api.post<ApiResponse<{ appointment: any }>>('/appointments', appointmentData);
    return response.data;
  },

  updateAppointmentStatus: async (id: string, statusData: any) => {
    const response = await api.patch<ApiResponse<{ appointment: any }>>(`/appointments/${id}`, statusData);
    return response.data;
  },

  deleteAppointment: async (id: string) => {
    const response = await api.delete<ApiResponse<null>>(`/appointments/${id}`);
    return response.data;
  }
};

export default api;
