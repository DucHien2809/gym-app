'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

// Các vai trò có sẵn
type AllowedRoles = 'admin' | 'trainer' | 'member' | undefined;

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: AllowedRoles[];
}

const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
  const { auth, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    console.log('🛡️ ProtectedRoute check - loading:', loading, 'user:', !!auth.user, 'authenticated:', auth.isAuthenticated);
    
    // Chỉ kiểm tra khi quá trình tải hoàn tất
    if (!loading) {
      // Kiểm tra nếu người dùng chưa đăng nhập
      if (!auth.user) {
        console.log('🚫 No user found, redirecting to login');
        router.push('/auth/login');
        return;
      }

      console.log('✅ User authenticated:', auth.user.name, 'Role:', auth.user.role);

      // Kiểm tra vai trò nếu allowedRoles được xác định
      if (allowedRoles && allowedRoles.length > 0) {
        const userRole = auth.user.role;
        console.log('🔒 Checking role access. User role:', userRole, 'Allowed roles:', allowedRoles);
        
        if (!allowedRoles.includes(userRole as AllowedRoles)) {
          console.log('❌ User role not allowed, redirecting based on role');
          // Chuyển hướng đến trang mặc định dựa trên vai trò
          if (userRole === 'admin') {
            router.push('/dashboard/admin');
          } else if (userRole === 'trainer') {
            router.push('/dashboard/trainer');
          } else {
            router.push('/dashboard/member');
          }
        } else {
          console.log('✅ User role allowed, displaying content');
        }
      } else {
        console.log('✅ No role restrictions, displaying content');
      }
    }
  }, [auth.user, loading, router, allowedRoles]);

  // Hiển thị trạng thái đang tải
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  // Nếu người dùng đã đăng nhập và có quyền truy cập, hiển thị nội dung
  if (auth.user) {
    // Không có allowedRoles hoặc người dùng có vai trò được phép
    if (!allowedRoles || allowedRoles.includes(auth.user.role as AllowedRoles)) {
      return <>{children}</>;
    }
  }

  // Nếu chưa được chuyển hướng, không hiển thị gì cả
  return null;
};

export default ProtectedRoute; 