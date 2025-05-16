// Định nghĩa các types cho dự án

// User types
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'trainer' | 'member';
  phone?: string;
  address?: string;
  dateOfBirth?: string;
  profileImage?: string;
  active: boolean;
  createdAt: string;
}

// Auth types
export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  phone?: string;
  address?: string;
  dateOfBirth?: string;
}

// Membership types
export interface Membership {
  id: string;
  name: string;
  description: string;
  duration: number;
  price: number;
  features: string[];
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

// Subscription types
export interface Subscription {
  id: string;
  memberId: string;
  membershipId: string;
  member?: User;
  membership?: Membership;
  startDate: string;
  endDate: string;
  paymentStatus: 'pending' | 'completed' | 'failed' | 'refunded';
  paymentAmount: number;
  paymentDate?: string;
  paymentMethod: 'cash' | 'bank_transfer' | 'credit_card';
  active: boolean;
  notes?: string;
  createdById?: string;
  createdBy?: User;
  createdAt: string;
  updatedAt: string;
}

// Attendance types
export interface Attendance {
  id: string;
  memberId: string;
  member?: User;
  checkInTime: string;
  checkOutTime?: string;
  duration?: number;
  notes?: string;
  createdById?: string;
  createdBy?: User;
  createdAt: string;
}

// Equipment types
export interface Equipment {
  id: string;
  name: string;
  description: string;
  category: string;
  purchaseDate: string;
  purchasePrice: number;
  manufacturer: string;
  model?: string;
  serialNumber?: string;
  status: 'available' | 'in-use' | 'maintenance' | 'retired';
  location?: string;
  lastMaintenance?: string;
  nextMaintenance?: string;
  image?: string;
  notes?: string;
  createdById?: string;
  createdBy?: User;
  createdAt: string;
  updatedAt: string;
  maintenanceLogs?: MaintenanceLog[];
}

// Maintenance Log types
export interface MaintenanceLog {
  id: string;
  equipmentId: string;
  equipment?: Equipment;
  maintenanceDate: string;
  maintenanceType: string;
  description: string;
  cost?: number;
  technician?: string;
  parts?: string;
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
  createdById?: string;
  createdBy?: User;
  createdAt: string;
  updatedAt: string;
}

// API Response types
export interface ApiResponse<T> {
  status: 'success' | 'fail' | 'error';
  data?: {
    [key: string]: T;
  };
  results?: number;
  message?: string;
  token?: string;
  error?: {
    status: string;
    message: string;
  };
}
