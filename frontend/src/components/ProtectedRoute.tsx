'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

// Available roles
type AllowedRoles = 'admin' | 'trainer' | 'member' | undefined;

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: AllowedRoles[];
}

const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
  const { auth, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Only check when loading is complete
    if (!loading) {
      // Check if user is not logged in
      if (!auth.user) {
        router.push('/auth/login');
        return;
      }

      // Check roles if allowedRoles is defined
      if (allowedRoles && allowedRoles.length > 0) {
        const userRole = auth.user.role;
        if (!allowedRoles.includes(userRole as AllowedRoles)) {
          // Redirect to the default page based on role
          if (userRole === 'admin') {
            router.push('/dashboard/admin');
          } else if (userRole === 'trainer') {
            router.push('/dashboard/trainer');
          } else {
            router.push('/dashboard/member');
          }
        }
      }
    }
  }, [auth.user, loading, router, allowedRoles]);

  // Display loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  // If user is logged in and has access, show content
  if (auth.user) {
    // No allowedRoles or user has allowed role
    if (!allowedRoles || allowedRoles.includes(auth.user.role as AllowedRoles)) {
      return <>{children}</>;
    }
  }

  // If not redirected yet, show nothing
  return null;
};

export default ProtectedRoute; 