'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import ProtectedRoute from '@/components/ProtectedRoute';

export default function TrainerDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { auth, logout } = useAuth();

  const navigation = [
    { name: 'Bảng điều khiển', href: '/dashboard/trainer', current: pathname === '/dashboard/trainer' },
    { name: 'Lịch hẹn', href: '/dashboard/trainer/appointments', current: pathname === '/dashboard/trainer/appointments' },
    { name: 'Điểm danh', href: '/dashboard/trainer/check-in', current: pathname === '/dashboard/trainer/check-in' },
    { name: 'Hồ sơ', href: '/dashboard/trainer/profile', current: pathname === '/dashboard/trainer/profile' },
    // Add more navigation items as needed
  ];

  return (
    <ProtectedRoute allowedRoles={['trainer']}>
      <div className="min-h-screen">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700">
          <nav className="flex items-center justify-between p-4 lg:px-8" aria-label="Global">
            <div className="flex lg:flex-1">
              <Link href="/" className="-m-1.5 p-1.5 text-white font-bold text-xl">
                QUẢN LÝ PHÒNG TẬP
              </Link>
            </div>
            <div className="flex gap-x-6">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`${
                    item.current
                      ? 'bg-blue-700 text-white'
                      : 'text-blue-100 hover:bg-blue-500 hover:text-white'
                  } rounded-md px-3 py-2 text-sm font-medium`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
            <div className="flex lg:flex-1 lg:justify-end items-center">
              <span className="text-white mr-2">{auth.user?.name}</span>
              <button
                onClick={logout}
                className="ml-2 px-3 py-1 bg-white text-blue-700 rounded-md font-medium hover:bg-blue-50 transition"
              >
                Đăng xuất
              </button>
            </div>
          </nav>
        </div>

        {/* Page content */}
        <main className="py-6">{children}</main>
      </div>
    </ProtectedRoute>
  );
} 