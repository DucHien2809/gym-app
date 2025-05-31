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

// Function to save token and user info
const saveAuthData = (token: string, user: User) => {
  localStorage.setItem('token', token);
  localStorage.setItem('user', JSON.stringify(user));
  localStorage.setItem('tokenTimestamp', Date.now().toString());
};

// Function to clear token and user info
const clearAuthData = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  localStorage.removeItem('tokenTimestamp');
};

// Function to check if token is valid
const isTokenValid = () => {
  const tokenTimestamp = localStorage.getItem('tokenTimestamp');
  if (!tokenTimestamp) return false;
  
  const timestamp = parseInt(tokenTimestamp, 10);
  const now = Date.now();
  return now - timestamp < TOKEN_EXPIRY_TIME;
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
        const token = localStorage.getItem('token') || '';
        
        // Update localStorage
        saveAuthData(token, user);
        
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
        
        // Check if there's a token in localStorage
        const token = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user');
        
        if (token && storedUser && isTokenValid()) {
          console.log('Found valid token in localStorage');
          
          // Use user from localStorage for immediate display
          const user = JSON.parse(storedUser) as User;
          
          setAuth({
            user,
            token,
            isAuthenticated: true,
            isLoading: true, // set loading while verifying with server
            error: null,
          });
          
          // Then verify with server
          try {
            const response = await authAPI.getMe();
            
            if (response.status === 'success' && response.data?.user) {
              console.log('User verified with server');
              
              // Update user data if there are changes
              const updatedUser = response.data.user as unknown as User;
              
              // Update localStorage
              saveAuthData(token, updatedUser);
              
              setAuth({
                user: updatedUser,
                token,
                isAuthenticated: true,
                isLoading: false,
                error: null,
              });
            } else {
              console.log('Token invalid according to server response');
              clearAuthData();
              
              setAuth({
                user: null,
                token: null,
                isAuthenticated: false,
                isLoading: false,
                error: null,
              });
            }
          } catch (error) {
            console.error('Error verifying token with server:', error);
            // Force clear token and auth state on verification error
            clearAuthData();
            
            setAuth({
              user: null,
              token: null,
              isAuthenticated: false,
              isLoading: false,
              error: null,
            });
          }
        } else {
          console.log('No valid token found in localStorage');
          clearAuthData();
          
          setAuth({
            user: null,
            token: null,
            isAuthenticated: false,
            isLoading: false,
            error: null,
          });
        }
      } catch (error) {
        console.error('Auth check error:', error);
        clearAuthData();
        
        setAuth({
          user: null,
          token: null,
          isAuthenticated: false,
          isLoading: false,
          error: null,
        });
      } finally {
        setLoading(false);
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
        
        // Save to localStorage
        saveAuthData(token, user);
        
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
        
        // Save to localStorage
        saveAuthData(token, user);
        
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
    // Clear localStorage
    clearAuthData();
    
    // Update state
    setAuth({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
    });
    
    // Redirect to login page
    router.push('/auth/login');
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
