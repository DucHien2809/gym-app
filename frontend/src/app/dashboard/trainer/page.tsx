'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { 
  FiUsers, 
  FiCalendar, 
  FiClock, 
  FiClipboard, 
  FiActivity, 
  FiTrendingUp, 
  FiGrid, 
  FiMessageSquare, 
  FiAlertCircle,
  FiSearch,
  FiRefreshCw,
  FiBell
} from 'react-icons/fi';
import Image from 'next/image';
import { dashboardAPI } from '@/services/api';

// Define types for the dashboard data
interface DashboardStats {
  totalMembers: number;
  activeMembers: number;
  todayCheckIns: number;
  upcomingSessions: number;
}

interface Appointment {
  id: string;
  memberName: string;
  time: string;
  date: string;
  type: string;
}

interface Activity {
  id: string;
  memberName: string;
  action: string;
  time: string;
}

interface Alert {
  id: string;
  memberName: string;
  issue: string;
  priority: 'high' | 'medium' | 'low';
}

export default function TrainerDashboard() {
  const { auth, logout } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<DashboardStats>({
    totalMembers: 0,
    activeMembers: 0,
    todayCheckIns: 0,
    upcomingSessions: 0
  });
  const [upcomingAppointments, setUpcomingAppointments] = useState<Appointment[]>([]);
  const [recentActivities, setRecentActivities] = useState<Activity[]>([]);
  const [memberAlerts, setMemberAlerts] = useState<Alert[]>([]);
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
      const response = await dashboardAPI.getTrainerDashboardStats();
      
      if (response.status === 'success' && response.data) {
        // Use a more specific type assertion
        const data = response.data as unknown as {
          stats: {
            totalMembers: number;
            activeMembers: number;
            todayCheckIns: number;
            upcomingSessions: number;
          };
          upcomingAppointments: Appointment[];
          recentActivities: Activity[];
          memberAlerts: Alert[];
        };
        
        // Set stats with defaults for missing data
        setStats({
          totalMembers: data.stats?.totalMembers || 0,
          activeMembers: data.stats?.activeMembers || 0,
          todayCheckIns: data.stats?.todayCheckIns || 0,
          upcomingSessions: data.stats?.upcomingSessions || 0
        });
        
        // Set other data with empty arrays as fallbacks
        if (Array.isArray(data.upcomingAppointments)) {
          setUpcomingAppointments(data.upcomingAppointments);
        }
        
        if (Array.isArray(data.recentActivities)) {
          setRecentActivities(data.recentActivities);
        }
        
        if (Array.isArray(data.memberAlerts)) {
          setMemberAlerts(data.memberAlerts);
        }
      } else {
        setError('Failed to load dashboard data');
      }
    } catch (error: any) {
      console.error('Error fetching dashboard data:', error);
      setError(`Failed to fetch dashboard data: ${error.message || JSON.stringify(error)}`);
    } finally {
      setLoading(false);
    }
  };

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  const formatDate = () => {
    return new Date().toLocaleDateString('vi-VN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 shadow-lg">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-white">Bảng Điều Khiển Huấn Luyện Viên</h1>
              <p className="mt-1 text-blue-100">{formatDate()}</p>
            </div>
            <div className="flex items-center space-x-4">
              <button 
                onClick={fetchDashboardData}
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-white hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
              >
                <FiRefreshCw className="mr-2 h-4 w-4" />
                Làm mới
              </button>
              <div className="relative">
                <FiBell className="h-6 w-6 text-white cursor-pointer hover:text-blue-200 transition-colors" />
              </div>
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
              <FiAlertCircle className="h-8 w-8 text-red-500" />
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
              {/* Total Members */}
              <div className="overflow-hidden rounded-xl bg-white shadow-md transition-all hover:shadow-lg border border-gray-100">
                <div className="px-4 py-5 sm:p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-blue-100 rounded-md p-3">
                      <FiUsers className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="truncate text-sm font-medium text-gray-500">Tổng Số Thành Viên</dt>
                        <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">{stats.totalMembers}</dd>
                      </dl>
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="flex items-center text-sm text-blue-600">
                      <FiActivity className="h-4 w-4 mr-1" />
                      <span className="font-medium">{stats.activeMembers} thành viên đang hoạt động</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Today's Check-ins */}
              <div className="overflow-hidden rounded-xl bg-white shadow-md transition-all hover:shadow-lg border border-gray-100">
                <div className="px-4 py-5 sm:p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-green-100 rounded-md p-3">
                      <FiClock className="h-6 w-6 text-green-600" />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="truncate text-sm font-medium text-gray-500">Điểm Danh Hôm Nay</dt>
                        <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">{stats.todayCheckIns}</dd>
                      </dl>
                    </div>
                  </div>
                  <div className="mt-4">
                    <button 
                      onClick={() => handleNavigation('/dashboard/trainer/check-in')}
                      className="inline-flex items-center text-sm font-medium text-green-600"
                    >
                      Quản lý điểm danh
                      <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              {/* Upcoming Sessions */}
              <div className="overflow-hidden rounded-xl bg-white shadow-md transition-all hover:shadow-lg border border-gray-100">
                <div className="px-4 py-5 sm:p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-purple-100 rounded-md p-3">
                      <FiCalendar className="h-6 w-6 text-purple-600" />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="truncate text-sm font-medium text-gray-500">Buổi Tập Sắp Tới</dt>
                        <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">{stats.upcomingSessions}</dd>
                      </dl>
                    </div>
                  </div>
                  <div className="mt-4">
                    <button 
                      onClick={() => handleNavigation('/dashboard/trainer/schedule')}
                      className="inline-flex items-center text-sm font-medium text-purple-600"
                    >
                      Xem lịch trình
                      <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="overflow-hidden rounded-xl bg-white shadow-md transition-all hover:shadow-lg border border-gray-100">
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg font-medium text-gray-900">Thao Tác Nhanh</h3>
                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <button 
                      onClick={() => handleNavigation('/dashboard/trainer/check-in')}
                      className="inline-flex items-center justify-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      <FiClock className="mr-2 h-4 w-4" />
                      Điểm danh
                    </button>
                    <button 
                      onClick={() => handleNavigation('/dashboard/trainer/members')}
                      className="inline-flex items-center justify-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      <FiUsers className="mr-2 h-4 w-4" />
                      Thành viên
                    </button>
                    <button 
                      onClick={() => handleNavigation('/dashboard/trainer/workouts')}
                      className="inline-flex items-center justify-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      <FiActivity className="mr-2 h-4 w-4" />
                      Bài tập
                    </button>
                    <button 
                      onClick={() => handleNavigation('/dashboard/trainer/schedule')}
                      className="inline-flex items-center justify-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      <FiCalendar className="mr-2 h-4 w-4" />
                      Lịch trình
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column - Upcoming Appointments */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
                  <div className="px-6 py-4 bg-gradient-to-r from-blue-500 to-blue-600">
                    <h2 className="text-xl font-semibold text-white flex items-center">
                      <FiCalendar className="mr-2" /> Lịch Hẹn Sắp Tới
                    </h2>
                  </div>
                  <div className="p-6">
                    {upcomingAppointments.length > 0 ? (
                      <div className="divide-y divide-gray-200">
                        {upcomingAppointments.map((appointment) => (
                          <div key={appointment.id} className="py-4 flex justify-between items-center">
                            <div>
                              <h3 className="text-lg font-medium text-gray-900">{appointment.memberName}</h3>
                              <div className="mt-1 flex items-center">
                                <span className="text-sm text-gray-500 mr-3">{appointment.time} - {appointment.date}</span>
                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                                  {appointment.type}
                                </span>
                              </div>
                            </div>
                            <div className="flex space-x-2">
                              <button className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                                Chi tiết
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-4">
                        <p className="text-gray-500">Không có lịch hẹn sắp tới</p>
                      </div>
                    )}
                    <div className="mt-4 text-center">
                      <button 
                        onClick={() => handleNavigation('/dashboard/trainer/schedule')}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        Xem tất cả lịch hẹn
                      </button>
                    </div>
                  </div>
                </div>

                {/* Recent Activities */}
                <div className="bg-white rounded-xl shadow-md overflow-hidden">
                  <div className="px-6 py-4 bg-gradient-to-r from-green-500 to-green-600">
                    <h2 className="text-xl font-semibold text-white flex items-center">
                      <FiActivity className="mr-2" /> Hoạt Động Gần Đây
                    </h2>
                  </div>
                  <div className="p-6">
                    {recentActivities.length > 0 ? (
                      <div className="space-y-4">
                        {recentActivities.map((activity) => (
                          <div key={activity.id} className="flex items-start">
                            <div className="flex-shrink-0">
                              <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                                <span className="text-green-600 font-medium">
                                  {activity.memberName.charAt(0)}
                                </span>
                              </div>
                            </div>
                            <div className="ml-3">
                              <p className="text-sm text-gray-700">
                                <span className="font-medium">{activity.memberName}</span> {activity.action}
                              </p>
                              <p className="text-xs text-gray-500">{activity.time}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-4">
                        <p className="text-gray-500">Không có hoạt động gần đây</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Right Column - Member Alerts & Quick Access */}
              <div>
                {/* Member Alerts */}
                <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
                  <div className="px-6 py-4 bg-gradient-to-r from-amber-500 to-amber-600">
                    <h2 className="text-xl font-semibold text-white flex items-center">
                      <FiAlertCircle className="mr-2" /> Cảnh Báo Thành Viên
                    </h2>
                  </div>
                  <div className="p-6">
                    {memberAlerts.length > 0 ? (
                      <div className="space-y-4">
                        {memberAlerts.map((alert) => (
                          <div 
                            key={alert.id} 
                            className={`p-3 rounded-lg border ${
                              alert.priority === 'high' ? 'border-red-200 bg-red-50' : 
                              alert.priority === 'medium' ? 'border-amber-200 bg-amber-50' : 
                              'border-blue-200 bg-blue-50'
                            }`}
                          >
                            <div className="flex justify-between items-center">
                              <h3 className="font-medium text-gray-900">{alert.memberName}</h3>
                              <span 
                                className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                  alert.priority === 'high' ? 'bg-red-100 text-red-800' : 
                                  alert.priority === 'medium' ? 'bg-amber-100 text-amber-800' : 
                                  'bg-blue-100 text-blue-800'
                                }`}
                              >
                                {alert.priority === 'high' ? 'Cao' : 
                                 alert.priority === 'medium' ? 'Trung bình' : 'Thấp'}
                              </span>
                            </div>
                            <p className="mt-1 text-sm text-gray-600">{alert.issue}</p>
                            <div className="mt-2 text-right">
                              <button className="text-sm text-blue-600 hover:text-blue-800">
                                Xử lý
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-4">
                        <p className="text-gray-500">Không có cảnh báo nào</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Quick Access */}
                <div className="bg-white rounded-xl shadow-md overflow-hidden">
                  <div className="px-6 py-4 bg-gradient-to-r from-indigo-500 to-indigo-600">
                    <h2 className="text-xl font-semibold text-white flex items-center">
                      <FiGrid className="mr-2" /> Truy Cập Nhanh
                    </h2>
                  </div>
                  <div className="p-6">
                    <div className="grid grid-cols-2 gap-4">
                      <button
                        onClick={() => handleNavigation('/dashboard/trainer/workouts')}
                        className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-indigo-50 transition-colors"
                      >
                        <FiClipboard className="h-8 w-8 text-indigo-600" />
                        <span className="mt-2 text-sm font-medium text-gray-900">Bài Tập</span>
                      </button>
                      <button
                        onClick={() => handleNavigation('/dashboard/trainer/progress')}
                        className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-indigo-50 transition-colors"
                      >
                        <FiTrendingUp className="h-8 w-8 text-indigo-600" />
                        <span className="mt-2 text-sm font-medium text-gray-900">Tiến Độ</span>
                      </button>
                      <button
                        onClick={() => handleNavigation('/dashboard/trainer/messages')}
                        className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-indigo-50 transition-colors"
                      >
                        <FiMessageSquare className="h-8 w-8 text-indigo-600" />
                        <span className="mt-2 text-sm font-medium text-gray-900">Tin Nhắn</span>
                      </button>
                      <button
                        onClick={() => handleNavigation('/dashboard/trainer/subscriptions')}
                        className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-indigo-50 transition-colors"
                      >
                        <FiUsers className="h-8 w-8 text-indigo-600" />
                        <span className="mt-2 text-sm font-medium text-gray-900">Gói Tập</span>
                      </button>
                    </div>
                    
                    <div className="mt-6">
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FiSearch className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="text"
                          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          placeholder="Tìm kiếm thành viên..."
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
} 