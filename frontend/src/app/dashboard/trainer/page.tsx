'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function TrainerDashboard() {
  const { auth } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (auth.user && auth.user.role !== 'trainer') {
      router.push('/');
    }
  }, [auth.user, router]);

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="py-10">
        <header>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Trainer Dashboard</h1>
          </div>
        </header>
        <main>
          <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="px-4 py-8 sm:px-0">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {/* Check-in Card */}
                <div
                  className="bg-white overflow-hidden shadow rounded-lg cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => handleNavigation('/dashboard/trainer/check-in')}
                >
                  <div className="px-4 py-5 sm:p-6">
                    <h3 className="text-lg font-medium text-gray-900">Check-in/Check-out</h3>
                    <p className="mt-1 text-sm text-gray-500">Quản lý điểm danh thành viên</p>
                  </div>
                </div>

                {/* Subscriptions Card */}
                <div
                  className="bg-white overflow-hidden shadow rounded-lg cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => handleNavigation('/dashboard/trainer/subscriptions')}
                >
                  <div className="px-4 py-5 sm:p-6">
                    <h3 className="text-lg font-medium text-gray-900">Gói tập</h3>
                    <p className="mt-1 text-sm text-gray-500">Quản lý gói tập của thành viên</p>
                  </div>
                </div>

                {/* Attendance Card */}
                <div
                  className="bg-white overflow-hidden shadow rounded-lg cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => handleNavigation('/dashboard/trainer/attendance')}
                >
                  <div className="px-4 py-5 sm:p-6">
                    <h3 className="text-lg font-medium text-gray-900">Lịch sử điểm danh</h3>
                    <p className="mt-1 text-sm text-gray-500">Xem lịch sử điểm danh của thành viên</p>
                  </div>
                </div>

                {/* Members Card */}
                <div
                  className="bg-white overflow-hidden shadow rounded-lg cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => handleNavigation('/dashboard/trainer/members')}
                >
                  <div className="px-4 py-5 sm:p-6">
                    <h3 className="text-lg font-medium text-gray-900">Thành viên</h3>
                    <p className="mt-1 text-sm text-gray-500">Quản lý thông tin thành viên</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
} 