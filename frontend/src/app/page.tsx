'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export default function Home() {
  const { auth, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    console.log('🏠 Home page - loading:', loading, 'isAuthenticated:', auth.isAuthenticated, 'user:', !!auth.user);
    
    // Only redirect when authentication check is complete (loading is false)
    if (!loading) {
      if (auth.isAuthenticated && auth.user) {
        // User is logged in - redirect to appropriate dashboard
        const role = auth.user.role;
        console.log('✅ User authenticated, redirecting to dashboard for role:', role);
        
        switch (role) {
          case 'admin':
            router.push('/dashboard/admin');
            break;
          case 'trainer':
            router.push('/dashboard/trainer');
            break;
          case 'member':
            router.push('/dashboard/member');
            break;
          default:
            console.log('❌ Unknown role, redirecting to login');
            router.push('/auth/login');
            break;
        }
      } else {
        // User is not logged in - redirect to login page
        console.log('🚫 User not authenticated, redirecting to login');
        router.push('/auth/login');
      }
    }
  }, [loading, auth.isAuthenticated, auth.user, router]);

  // Show loading spinner while checking authentication
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-500 mx-auto"></div>
        <p className="mt-4 text-lg text-gray-600">Đang kiểm tra phiên đăng nhập...</p>
      </div>
    </div>
  );
}
