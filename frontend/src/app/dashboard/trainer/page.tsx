'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { 
  FiCalendar, 
  FiClock, 
  FiRefreshCw,
  FiArrowRight,
  FiUsers,
  FiCheckCircle
} from 'react-icons/fi';
import { motion } from 'framer-motion';
import { dashboardAPI, appointmentAPI } from '@/services/api';

// Define simplified types for the dashboard data
interface DashboardStats {
  todayCheckIns: number;
  pendingAppointments: number;
  totalAppointments: number;
  totalMembers: number;
}

interface RecentAppointment {
  id: string;
  title: string;
  memberName: string;
  appointmentDate: string;
  status: string;
}

export default function TrainerDashboard() {
  const { auth } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<DashboardStats>({
    todayCheckIns: 0,
    pendingAppointments: 0,
    totalAppointments: 0,
    totalMembers: 0
  });
  const [recentAppointments, setRecentAppointments] = useState<RecentAppointment[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    if (auth.user) {
      if (auth.user.role !== 'trainer') {
        router.push(`/dashboard/${auth.user.role}`);
        return;
      }
      fetchDashboardData();
    }
  }, [auth.user, router]);

  const fetchDashboardData = async () => {
    setLoading(true);
    setError('');
    try {
      // Fetch basic stats and recent appointments
      const [dashboardResponse, appointmentsResponse] = await Promise.all([
        dashboardAPI.getTrainerDashboardStats().catch(() => ({ status: 'error', data: null })),
        appointmentAPI.getTrainerAppointments(auth.user?.id || '').catch(() => ({ status: 'error', data: null }))
      ]);
      
      // Set stats with defaults
      if (dashboardResponse.status === 'success' && dashboardResponse.data) {
        const data = dashboardResponse.data as any;
        setStats({
          todayCheckIns: data.stats?.todayCheckIns || 0,
          pendingAppointments: data.stats?.pendingAppointments || 0,
          totalAppointments: data.stats?.totalAppointments || 0,
          totalMembers: data.stats?.totalMembers || 0
        });
      }
      
      // Set recent appointments
      if (appointmentsResponse.status === 'success' && appointmentsResponse.data?.appointments) {
        const appointments = appointmentsResponse.data.appointments as any[];
        const recent = appointments
          .slice(0, 5)
          .map(apt => ({
            id: apt.id,
            title: apt.title,
            memberName: apt.member?.name || 'Unknown Member',
            appointmentDate: apt.appointmentDate,
            status: apt.status
          }));
        setRecentAppointments(recent);
        
        // Update stats based on actual appointment data
        setStats(prev => ({
          ...prev,
          totalAppointments: appointments.length,
          pendingAppointments: appointments.filter(apt => apt.status === 'pending').length
        }));
      }
      
    } catch (error: any) {
      console.error('Error fetching dashboard data:', error);
      setError('Không thể tải dữ liệu. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const formatTodayDate = () => {
    return new Date().toLocaleDateString('vi-VN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'accepted':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending':
        return 'Chờ xử lý';
      case 'accepted':
        return 'Đã chấp nhận';
      case 'rejected':
        return 'Đã từ chối';
      case 'completed':
        return 'Hoàn thành';
      default:
        return status;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 shadow-lg">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-white">Bảng Điều Khiển Huấn Luyện Viên</h1>
              <p className="mt-1 text-blue-100">{formatTodayDate()}</p>
            </div>
            <div className="flex items-center space-x-4">
              <button 
                onClick={fetchDashboardData}
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-white hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
              >
                <FiRefreshCw className="mr-2 h-4 w-4" />
                Làm mới
              </button>
            </div>
          </div>
        </div>
      </div>

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
            <p className="mt-4 text-lg text-gray-600">Đang tải dữ liệu...</p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="rounded-full h-16 w-16 bg-red-100 flex items-center justify-center">
              <FiClock className="h-8 w-8 text-red-500" />
            </div>
            <p className="mt-4 text-lg text-gray-600">{error}</p>
            <button 
              onClick={fetchDashboardData}
              className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <FiRefreshCw className="mr-2 h-4 w-4" />
              Thử lại
            </button>
          </div>
        ) : (
          <>
            {/* Stats Overview */}
            <div className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {/* Today's Check-ins */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden rounded-xl bg-white shadow-lg transition-all hover:shadow-xl border border-gray-100"
              >
                <div className="px-4 py-5 sm:p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-green-100 rounded-lg p-3">
                      <FiCheckCircle className="h-6 w-6 text-green-600" />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="truncate text-sm font-medium text-gray-500">Điểm Danh Hôm Nay</dt>
                        <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">{stats.todayCheckIns}</dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Pending Appointments */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="overflow-hidden rounded-xl bg-white shadow-lg transition-all hover:shadow-xl border border-gray-100"
              >
                <div className="px-4 py-5 sm:p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-yellow-100 rounded-lg p-3">
                      <FiClock className="h-6 w-6 text-yellow-600" />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="truncate text-sm font-medium text-gray-500">Lịch Hẹn Chờ Xử Lý</dt>
                        <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">{stats.pendingAppointments}</dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Total Appointments */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                className="overflow-hidden rounded-xl bg-white shadow-lg transition-all hover:shadow-xl border border-gray-100"
              >
                <div className="px-4 py-5 sm:p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-blue-100 rounded-lg p-3">
                      <FiCalendar className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="truncate text-sm font-medium text-gray-500">Tổng Lịch Hẹn</dt>
                        <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">{stats.totalAppointments}</dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Total Members */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.3 }}
                className="overflow-hidden rounded-xl bg-white shadow-lg transition-all hover:shadow-xl border border-gray-100"
              >
                <div className="px-4 py-5 sm:p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-purple-100 rounded-lg p-3">
                      <FiUsers className="h-6 w-6 text-purple-600" />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="truncate text-sm font-medium text-gray-500">Tổng Thành Viên</dt>
                        <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">{stats.totalMembers}</dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Main Features */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              {/* Appointment Management */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden"
              >
                <div className="px-6 py-4 bg-gradient-to-r from-blue-500 to-blue-600">
                  <h2 className="text-xl font-semibold text-white flex items-center">
                    <FiCalendar className="mr-3 h-6 w-6" /> 
                    Quản Lý Lịch Hẹn
                  </h2>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 mb-6">
                    Xem và quản lý tất cả các yêu cầu lịch hẹn từ học viên. Chấp nhận, từ chối hoặc đánh dấu hoàn thành các buổi tập.
                  </p>
                  
                  {recentAppointments.length > 0 && (
                    <div className="mb-6">
                      <h3 className="text-sm font-medium text-gray-700 mb-3">Lịch hẹn gần đây:</h3>
                      <div className="space-y-3">
                        {recentAppointments.slice(0, 3).map((appointment) => (
                          <div key={appointment.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div>
                              <p className="text-sm font-medium text-gray-900">{appointment.title}</p>
                              <p className="text-xs text-gray-500">{appointment.memberName}</p>
                              <p className="text-xs text-gray-500">{formatDate(appointment.appointmentDate)}</p>
                            </div>
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(appointment.status)}`}>
                              {getStatusText(appointment.status)}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <button
                    onClick={() => handleNavigation('/dashboard/trainer/appointments')}
                    className="w-full inline-flex items-center justify-center px-4 py-3 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                  >
                    Xem Tất Cả Lịch Hẹn
                    <FiArrowRight className="ml-2 h-4 w-4" />
                  </button>
                </div>
              </motion.div>

              {/* Attendance Management */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden"
              >
                <div className="px-6 py-4 bg-gradient-to-r from-green-500 to-green-600">
                  <h2 className="text-xl font-semibold text-white flex items-center">
                    <FiCheckCircle className="mr-3 h-6 w-6" /> 
                    Quản Lý Điểm Danh
                  </h2>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 mb-6">
                    Theo dõi việc điểm danh của học viên, xem lịch sử tham gia các buổi tập và thống kê tần suất tập luyện.
                  </p>
                  
                  <div className="mb-6">
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <div className="flex items-center">
                        <FiCheckCircle className="h-5 w-5 text-green-600 mr-2" />
                        <span className="text-sm font-medium text-green-800">
                          Đã có {stats.todayCheckIns} lượt điểm danh hôm nay
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-3 mb-6">
                    <button
                      onClick={() => handleNavigation('/dashboard/trainer/attendance')}
                      className="w-full inline-flex items-center justify-center px-4 py-2 border border-green-200 text-sm font-medium rounded-lg text-green-700 bg-green-50 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200"
                    >
                      Xem Lịch Sử Điểm Danh
                      <FiArrowRight className="ml-2 h-4 w-4" />
                    </button>
                  </div>
                  
                  <button
                    onClick={() => handleNavigation('/dashboard/trainer/check-in')}
                    className="w-full inline-flex items-center justify-center px-4 py-3 border border-transparent text-sm font-medium rounded-lg text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200"
                  >
                    Điểm Danh Mới
                    <FiArrowRight className="ml-2 h-4 w-4" />
                  </button>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </main>
    </div>
  );
} 