'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import ProtectedRoute from '@/components/ProtectedRoute';

export default function MemberDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { auth } = useAuth();

  const navigation = [
    { name: 'Dashboard', href: '/dashboard/member', current: pathname === '/dashboard/member' },
    { name: 'Profile', href: '/dashboard/member/profile', current: pathname === '/dashboard/member/profile' },
    { name: 'Subscriptions', href: '/dashboard/member/subscriptions', current: pathname === '/dashboard/member/subscriptions' },
    { name: 'Attendance', href: '/dashboard/member/attendance', current: pathname === '/dashboard/member/attendance' },
  ];

  return (
    <ProtectedRoute allowedRoles={['member']}>
      <div className="min-h-screen">
        <div className="bg-indigo-600">
          <nav className="flex items-center justify-between p-4 lg:px-8" aria-label="Global">
            <div className="flex lg:flex-1">
              <Link href="/" className="-m-1.5 p-1.5 text-white font-bold text-xl">
                GYM MANAGEMENT
              </Link>
            </div>
            <div className="flex gap-x-6">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`${
                    item.current
                      ? 'bg-indigo-700 text-white'
                      : 'text-indigo-100 hover:bg-indigo-500 hover:text-white'
                  } rounded-md px-3 py-2 text-sm font-medium`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
            <div className="flex lg:flex-1 lg:justify-end">
              <span className="text-white mr-2">{auth.user?.name}</span>
            </div>
          </nav>
        </div>

        {/* Page content */}
        <main className="py-6">{children}</main>
      </div>
    </ProtectedRoute>
  );
} 