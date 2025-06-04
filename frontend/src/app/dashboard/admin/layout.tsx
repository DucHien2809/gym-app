'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import ProtectedRoute from '@/components/ProtectedRoute';

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { auth, logout } = useAuth();

  const navigation = [
    { name: 'Bảng điều khiển', href: '/dashboard/admin', current: pathname === '/dashboard/admin' },
    { name: 'Người dùng', href: '/dashboard/admin/users', current: pathname === '/dashboard/admin/users' },
    { name: 'Gói tập', href: '/dashboard/admin/memberships', current: pathname === '/dashboard/admin/memberships' },
    { name: 'Đăng ký', href: '/dashboard/admin/subscriptions', current: pathname === '/dashboard/admin/subscriptions' },
    { name: 'Điểm danh', href: '/dashboard/admin/attendance', current: pathname === '/dashboard/admin/attendance' },
    { name: 'Thiết bị', href: '/dashboard/admin/equipment', current: pathname === '/dashboard/admin/equipment' },
    { name: 'Hồ sơ', href: '/dashboard/admin/profile', current: pathname === '/dashboard/admin/profile' },
  ];

  return (
    <ProtectedRoute allowedRoles={['admin']}>
      <div className="min-h-screen">
        <div className="bg-indigo-700">
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
                      ? 'bg-indigo-800 text-white'
                      : 'text-indigo-100 hover:bg-indigo-600 hover:text-white'
                  } rounded-md px-3 py-2 text-sm font-medium`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
            <div className="flex lg:flex-1 lg:justify-end items-center">
              <span className="text-white font-medium px-3 py-2">{auth.user?.name}</span>
              <button
                onClick={logout}
                className="rounded-md bg-indigo-800 px-3 py-2 text-sm font-medium text-white hover:bg-indigo-900"
              >
                Đăng xuất
              </button>
            </div>
          </nav>
        </div>

        {/* Nội dung trang */}
        <main className="py-6">{children}</main>
      </div>
    </ProtectedRoute>
  );
} 