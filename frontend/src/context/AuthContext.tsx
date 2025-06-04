'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { authAPI } from '@/services/api';
import { AuthState, User, LoginCredentials, RegisterData } from '@/types';

interface AuthContextProps {
  auth: AuthState;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
  refreshUserData: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

// Token expiry time in milliseconds (30 days)
const TOKEN_EXPIRY_TIME = 30 * 24 * 60 * 60 * 1000;

// Function to save authentication token only
const saveAuthToken = (token: string) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('token', token);
    localStorage.setItem('tokenTimestamp', Date.now().toString());
    console.log('💾 Token saved to localStorage');
  }
};

// Function to clear authentication token
const clearAuthToken = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('token');
    localStorage.removeItem('user'); // Remove legacy user data if exists
    localStorage.removeItem('tokenTimestamp');
    console.log('🗑️ Token cleared from localStorage');
  }
};

// Function to check if token is valid
const isTokenValid = () => {
  if (typeof window === 'undefined') return false;
  
  const tokenTimestamp = localStorage.getItem('tokenTimestamp');
  if (!tokenTimestamp) {
    console.log('❌ No token timestamp found');
    return false;
  }
  
  const timestamp = parseInt(tokenTimestamp, 10);
  const now = Date.now();
  const timeElapsed = now - timestamp;
  const isValid = timeElapsed < TOKEN_EXPIRY_TIME;
  
  console.log(`⏰ Token timestamp: ${new Date(timestamp).toLocaleString()}`);
  console.log(`⏰ Current time: ${new Date(now).toLocaleString()}`);
  console.log(`⏰ Time elapsed: ${Math.round(timeElapsed / (1000 * 60 * 60))} hours`);
  console.log(`⏰ Token valid: ${isValid}`);
  
  return isValid;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [auth, setAuth] = useState<AuthState>({
    user: null,
    token: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
  });

  // Function for users to refresh their data
  const refreshUserData = async () => {
    try {
      setAuth(prev => ({ ...prev, isLoading: true }));
      const response = await authAPI.getMe();
      
      if (response.status === 'success' && response.data?.user) {
        const user = response.data.user as unknown as User;
        const token = typeof window !== 'undefined' ? localStorage.getItem('token') || '' : '';
        
        // Token is already saved, user data fetched fresh from API
        
        setAuth({
          user,
          token,
          isAuthenticated: true,
          isLoading: false,
          error: null,
        });
        
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Error refreshing user data:', error);
      return false;
    } finally {
      setAuth(prev => ({ ...prev, isLoading: false }));
    }
  };

  // Check if user is already logged in from localStorage
  useEffect(() => {
    const checkAuth = async () => {
      try {
        setLoading(true);
        console.log('🔍 Starting auth check...');
        
        // Check if there's a token in localStorage
        const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
        const tokenTimestamp = typeof window !== 'undefined' ? localStorage.getItem('tokenTimestamp') : null;
        console.log('📱 Token from localStorage:', token ? 'Found' : 'Not found');
        console.log('📅 Token timestamp:', tokenTimestamp);
        
        if (token && isTokenValid()) {
          console.log('✅ Found valid token in localStorage, verifying with server...');
          
          // Set loading state first while verifying with server
          setAuth({
            user: null, // Will be filled after server verification
            token,
            isAuthenticated: false, // Will be true after verification
            isLoading: true,
            error: null,
          });
          
          // Verify with server and get user data
          try {
            console.log('🌐 Calling authAPI.getMe()...');
            const response = await authAPI.getMe();
            console.log('📡 Server response:', response);
            
            if (response.status === 'success' && response.data?.user) {
              console.log('✅ User verified with server:', response.data.user);
              
              const user = response.data.user as unknown as User;
              
              setAuth({
                user,
                token,
                isAuthenticated: true,
                isLoading: false,
                error: null,
              });
              console.log('🎉 Authentication successful! User logged in.');
            } else {
              console.log('❌ Token invalid according to server response:', response);
              clearAuthToken();
              
              setAuth({
                user: null,
                token: null,
                isAuthenticated: false,
                isLoading: false,
                error: null,
              });
            }
          } catch (error) {
            console.error('❌ Error verifying token with server:', error);
            // Force clear token and auth state on verification error
            clearAuthToken();
            
            setAuth({
              user: null,
              token: null,
              isAuthenticated: false,
              isLoading: false,
              error: null,
            });
          }
        } else {
          console.log('❌ No valid token found in localStorage');
          console.log('Token exists:', !!token);
          console.log('Token valid:', token ? isTokenValid() : false);
          clearAuthToken();
          
          setAuth({
            user: null,
            token: null,
            isAuthenticated: false,
            isLoading: false,
            error: null,
          });
        }
      } catch (error) {
        console.error('❌ Auth check error:', error);
        clearAuthToken();
        
        setAuth({
          user: null,
          token: null,
          isAuthenticated: false,
          isLoading: false,
          error: null,
        });
      } finally {
        setLoading(false);
        console.log('🏁 Auth check completed');
      }
    };

    checkAuth();
  }, []);

  // Login
  const login = async (credentials: LoginCredentials) => {
    try {
      setAuth((prev) => ({ ...prev, isLoading: true, error: null }));
      const response = await authAPI.login(credentials.email, credentials.password);
      
      if (response.status === 'success' && response.token && response.data?.user) {
        const token = response.token;
        const user = response.data.user as unknown as User;
        
        // Save token to localStorage, user data will be fresh from API
        saveAuthToken(token);
        
        setAuth({
          user,
          token,
          isAuthenticated: true,
          isLoading: false,
          error: null,
        });

        // Redirect based on role
        if (user.role === 'admin') {
          router.push('/dashboard/admin');
        } else if (user.role === 'trainer') {
          router.push('/dashboard/trainer');
        } else {
          router.push('/dashboard/member');
        }
      }
    } catch (error: any) {
      console.error('Login error:', error);
      
      let errorMessage = 'Đăng nhập thất bại';
      
      if (error.response?.data?.message) {
        // Server returned an error message
        errorMessage = error.response.data.message;
      } else if (error.message) {
        // Generic error message
        errorMessage = error.message;
      } else if (error.request) {
        // Network error
        errorMessage = 'Không thể kết nối đến máy chủ. Vui lòng kiểm tra kết nối mạng.';
      }
      
      setAuth((prev) => ({
        ...prev,
        isLoading: false,
        error: errorMessage,
      }));
    }
  };

  // Register
  const register = async (userData: RegisterData) => {
    try {
      setAuth((prev) => ({ ...prev, isLoading: true, error: null }));
      
      // Check if backend is reachable before making the register request
      try {
        // Simple ping request to check connectivity
        await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/test`, {
          method: 'GET',
          mode: 'cors',
        });
      } catch (error) {
        // If the ping fails, show a more specific error message
        setAuth((prev) => ({
          ...prev,
          isLoading: false,
          error: 'Không thể kết nối đến máy chủ. Vui lòng kiểm tra kết nối mạng của bạn và thử lại sau.',
        }));
        return;
      }
      
      const response = await authAPI.register(userData);
      
      if (response.status === 'success' && response.token && response.data?.user) {
        const token = response.token;
        const user = response.data.user as unknown as User;
        
        // Save token to localStorage, user data will be fresh from API
        saveAuthToken(token);
        
        setAuth({
          user,
          token,
          isAuthenticated: true,
          isLoading: false,
          error: null,
        });

        router.push('/dashboard/member');
      }
    } catch (error: any) {
      console.error('Registration error:', error);
      
      let errorMessage = 'Đăng ký thất bại. Vui lòng thử lại sau.';
      
      if (error.message) {
        // Network error specific messages
        if (error.message.includes('Network Error')) {
          errorMessage = 'Lỗi kết nối mạng. Vui lòng kiểm tra kết nối internet của bạn và thử lại.';
        } else if (error.response?.data?.message) {
          errorMessage = error.response.data.message;
        } else {
          errorMessage = error.message;
        }
      }
      
      setAuth((prev) => ({
        ...prev,
        isLoading: false,
        error: errorMessage,
      }));
    }
  };

  // Logout
  const logout = async () => {
    try {
      // Clear token and auth state
      clearAuthToken();
      
      setAuth({
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      });

      // Redirect to login page
      router.push('/auth/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ auth, login, register, logout, loading, refreshUserData }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook to use AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
