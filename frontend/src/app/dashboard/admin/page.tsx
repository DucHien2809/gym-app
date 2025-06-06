'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { userAPI, membershipAPI, subscriptionAPI, dashboardAPI, cancellationAPI } from '@/services/api';
import { 
  FiUsers, 
  FiPackage, 
  FiCreditCard, 
  FiCalendar, 
  FiActivity, 
  FiSettings, 
  FiDollarSign, 
  FiTrendingUp,
  FiRefreshCw,
  FiGrid,
  FiShield,
  FiBarChart2
} from 'react-icons/fi';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function AdminDashboard() {
  const { auth } = useAuth();
  const router = useRouter();
  const [stats, setStats] = useState({
    totalMembers: 0,
    totalStaff: 0,
    totalMemberships: 0,
    totalSubscriptions: 0,
    activeSubscriptions: 0,
    revenue: 0,
    dailyRevenue: 0,
    newMembersThisMonth: 0,
    retentionRate: 0,
    checkInsToday: 0,
    classesToday: 0
  });
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [backendAvailable, setBackendAvailable] = useState(true);
  const [lastError, setLastError] = useState<string | null>(null);

  useEffect(() => {
    // Kiểm tra nếu người dùng tồn tại và có ID trước khi lấy dữ liệu
    if (auth.user && auth.user.id) {
      // Chỉ xác minh vai trò
      if (auth.user.role !== 'admin') {
        router.push(`/dashboard/${auth.user.role}`);
        return;
      }
      
      fetchDashboardData();
    }
  }, [auth.user, router]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setRefreshing(true);
      setBackendAvailable(true); // Reset backend availability status
      setLastError(null); // Reset error state
      
      // Try to use the backend API first for more accurate data
      try {
        console.log('Attempting to call admin dashboard API...');
        console.log('User:', auth.user);
        const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
        console.log('Token exists:', !!token);
        console.log('Token length:', token ? token.length : 0);
        
        if (!token) {
          throw new Error('No authentication token found');
        }
        
        if (!auth.user || !auth.isAuthenticated) {
          throw new Error('User not authenticated');
        }
        
        console.log('About to call dashboardAPI.getAdminDashboardStats()...');
        const dashboardResponse = await dashboardAPI.getAdminDashboardStats();
        if (dashboardResponse.status === 'success' && dashboardResponse.data) {
          const dashboardStats = (dashboardResponse.data as any).stats;
          console.log('Backend API response:', dashboardStats);
          
          // Use backend calculated stats (which only count completed payments for revenue)
          setStats({
            totalMembers: dashboardStats.totalMembers || 0,
            totalStaff: 0, // Backend doesn't provide this yet, we'll calculate separately
            totalMemberships: 0, // Backend doesn't provide this yet, we'll calculate separately
            totalSubscriptions: 0, // Backend doesn't provide this yet, we'll calculate separately
            activeSubscriptions: dashboardStats.activeSubscriptions || 0,
            revenue: dashboardStats.netRevenue || 0, // Use net revenue (revenue - refunds)
            dailyRevenue: 0, // Will calculate this separately
            newMembersThisMonth: 0, // Backend doesn't provide this yet, we'll calculate separately
            retentionRate: 0, // Backend doesn't provide this yet, we'll calculate separately
            checkInsToday: 0, // Backend doesn't provide this yet, we'll calculate separately
            classesToday: 0 // Backend doesn't provide this yet, we'll calculate separately
          });
          
          // Still fetch some additional data for display
          const [usersResponse, membershipsResponse, subscriptionsResponse] = await Promise.all([
            userAPI.getAllUsers().catch(() => ({ status: 'error', data: null })),
            membershipAPI.getAllMemberships().catch(() => ({ status: 'error', data: null })),
            subscriptionAPI.getAllSubscriptions().catch(() => ({ status: 'error', data: null }))
          ]);
          
          const users = Array.isArray(usersResponse.data?.users) ? usersResponse.data?.users : [];
          const members = users.filter((user: any) => user.role === 'member') || [];
          const staff = users.filter((user: any) => user.role === 'trainer') || [];
          const memberships = Array.isArray(membershipsResponse.data?.memberships) ? membershipsResponse.data?.memberships : [];
          const subscriptions = Array.isArray(subscriptionsResponse.data?.subscriptions) ? subscriptionsResponse.data?.subscriptions : [];
          
          // Calculate additional stats
          const currentDate = new Date();
          const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
          const newMembersThisMonth = members.filter((member: any) => {
            const createdAt = new Date(member.createdAt);
            return createdAt >= firstDayOfMonth;
          }).length;
          
          // Update stats with additional calculated data
          setStats(prev => ({
            ...prev,
            totalStaff: staff.length,
            totalMemberships: memberships.length,
            totalSubscriptions: subscriptions.length,
            newMembersThisMonth,
            checkInsToday: Math.round((dashboardStats.activeSubscriptions || 0) * 0.3), // Estimate
            classesToday: Math.min(8, Math.round((dashboardStats.activeSubscriptions || 0) / 10)) // Estimate
          }));
          
          return; // Successfully used backend API
        }
      } catch (error) {
        console.error('Failed to use backend API, falling back to manual calculation:', error);
        setBackendAvailable(false);
        
        // Set a more descriptive error message
        let errorMessage = 'Lỗi không xác định';
        if ((error as any).message) {
          errorMessage = (error as any).message;
        } else if ((error as any).responseData?.message) {
          errorMessage = (error as any).responseData.message;
        }
        setLastError(errorMessage);
        
        // Log key error information only
        console.error('Dashboard: Error details:', {
          message: (error as any).message,
          httpStatus: (error as any).httpStatus,
          responseData: (error as any).responseData,
          status: (error as any).status
        });
        
        // Check if it's an authentication error and suggest re-login
        if ((error as any).httpStatus === 401 || (error as any).responseData?.status === 'fail') {
          console.warn('Authentication error detected. User may need to log in again.');
        }
      }
      
      // Fallback to manual calculation if backend API fails
      const [usersResponse, membershipsResponse, subscriptionsResponse, cancellationsResponse] = await Promise.all([
        userAPI.getAllUsers(),
        membershipAPI.getAllMemberships(),
        subscriptionAPI.getAllSubscriptions(),
        cancellationAPI.getAllCancellationRequests().catch(() => ({ status: 'error', data: null }))
      ]);
      
      const users = Array.isArray(usersResponse.data?.users) ? usersResponse.data?.users : [];
      const members = users.filter((user: any) => user.role === 'member') || [];
      const staff = users.filter((user: any) => user.role === 'trainer') || [];
      const memberships = Array.isArray(membershipsResponse.data?.memberships) ? membershipsResponse.data?.memberships : [];
      const subscriptions = Array.isArray(subscriptionsResponse.data?.subscriptions) ? subscriptionsResponse.data?.subscriptions : [];
      const cancellations = Array.isArray(cancellationsResponse.data?.cancellationRequests) ? cancellationsResponse.data?.cancellationRequests : [];
      const activeSubscriptions = subscriptions.filter((sub: any) => sub.active) || [];
      
      // Calculate total revenue from subscriptions
      let totalRevenue = 0;
      const paidSubscriptions = subscriptions.filter((sub: any) => 
        sub.paymentStatus === 'completed' || sub.paymentStatus === 'paid' || sub.paymentStatus === 'cancelled'
      );
      paidSubscriptions.forEach((sub: any) => {
        totalRevenue += sub.paymentAmount || 0;
      });

      // Calculate daily revenue (today only)
      const today = new Date();
      const todayStr = today.toISOString().split('T')[0]; // YYYY-MM-DD format
      console.log('🗓️ Today string for comparison:', todayStr);
      
      let dailyRevenue = 0;
      console.log('💰 Checking subscriptions for daily revenue...');
      console.log('All subscriptions:', subscriptions.map(sub => ({
        id: sub.id,
        paymentDate: sub.paymentDate,
        paymentStatus: sub.paymentStatus,
        paymentAmount: sub.paymentAmount
      })));
      
      const todaySubscriptions = subscriptions.filter((sub: any) => {
        if (!sub.paymentDate) {
          console.log(`❌ Subscription ${sub.id} has no paymentDate`);
          return false;
        }
        const paymentDate = new Date(sub.paymentDate);
        const paymentDateStr = paymentDate.toISOString().split('T')[0];
        const statusMatch = sub.paymentStatus === 'completed' || sub.paymentStatus === 'paid';
        const dateMatch = paymentDateStr === todayStr;
        
        console.log(`🔍 Subscription ${sub.id}:`, {
          paymentDate: sub.paymentDate,
          paymentDateStr,
          todayStr,
          dateMatch,
          status: sub.paymentStatus,
          statusMatch,
          amount: sub.paymentAmount
        });
        
        return dateMatch && statusMatch;
      });
      
      console.log('✅ Today subscriptions found:', todaySubscriptions.length);
      todaySubscriptions.forEach((sub: any) => {
        console.log(`💸 Adding ${sub.paymentAmount} to daily revenue`);
        dailyRevenue += sub.paymentAmount || 0;
      });
      console.log('💰 Final daily revenue:', dailyRevenue);
      
      // Calculate total refunds from approved cancellation requests
      let totalRefunds = 0;
      const approvedCancellations = cancellations.filter((cancel: any) => 
        cancel.status === 'approved' && cancel.refundAmount
      );
      approvedCancellations.forEach((cancel: any) => {
        totalRefunds += cancel.refundAmount || 0;
      });
      
      // Calculate net revenue = subscriptions - refunds (no baseline)
      const netRevenue = totalRevenue - totalRefunds;
      
      // Calculate new members this month
      const currentDate = new Date();
      const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
      const newMembersThisMonth = members.filter((member: any) => {
        const createdAt = new Date(member.createdAt);
        return createdAt >= firstDayOfMonth;
      }).length;
      
      setStats({
        totalMembers: members.length,
        totalStaff: staff.length,
        totalMemberships: memberships.length,
        totalSubscriptions: subscriptions.length,
        activeSubscriptions: activeSubscriptions.length,
        revenue: netRevenue,
        dailyRevenue: dailyRevenue,
        newMembersThisMonth,
        retentionRate: 0,
        checkInsToday: Math.round(activeSubscriptions.length * 0.3),
        classesToday: Math.min(8, Math.round(activeSubscriptions.length / 10))
      });
    } catch (error) {
      console.error('Lỗi khi lấy dữ liệu bảng điều khiển:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleManageUsers = () => {
    router.push('/dashboard/admin/users');
  };

  const handleManageMemberships = () => {
    router.push('/dashboard/admin/memberships');
  };

  const handleManageSubscriptions = () => {
    router.push('/dashboard/admin/subscriptions');
  };

  const handleManageAttendance = () => {
    router.push('/dashboard/admin/attendance');
  };

  const handleManageEquipment = () => {
    router.push('/dashboard/admin/equipment');
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header with gradient */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold tracking-tight text-white">Bảng Điều Khiển Quản Trị</h1>
            <button 
              onClick={fetchDashboardData}
              disabled={refreshing}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-white hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 disabled:opacity-50"
            >
              <FiRefreshCw className={`mr-2 h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
              Làm mới
            </button>
          </div>
        </div>
      </div>

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {!backendAvailable && (
          <div className="mb-4 rounded-md bg-yellow-50 p-4 border border-yellow-200">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-yellow-800">Thông báo</h3>
                <div className="mt-2 text-sm text-yellow-700">
                  <p>Không thể kết nối tới máy chủ backend. Dữ liệu hiển thị có thể không chính xác hoàn toàn.</p>
                  {lastError && (
                    <p className="mt-1 font-medium">Chi tiết lỗi: {lastError}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
        
        {loading ? (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-500"></div>
            <p className="mt-4 text-lg text-gray-600">Đang tải dữ liệu bảng điều khiển...</p>
          </div>
        ) : (
          <>
            {/* Stats Overview */}
            <div className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {/* Total Members */}
              <div className="overflow-hidden rounded-xl bg-white shadow-md transition-all hover:shadow-lg border border-gray-100">
                <div className="px-4 py-5 sm:p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-indigo-100 rounded-md p-3">
                      <FiUsers className="h-6 w-6 text-indigo-600" />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="truncate text-sm font-medium text-gray-500">Tổng Số Thành Viên</dt>
                        <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">{stats.totalMembers}</dd>
                      </dl>
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="flex items-center text-sm text-green-600">
                      <FiTrendingUp className="h-4 w-4 mr-1" />
                      <span className="font-medium">{stats.newMembersThisMonth} thành viên mới</span>
                      <span className="ml-1 text-gray-500">tháng này</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Staff */}
              <div className="overflow-hidden rounded-xl bg-white shadow-md transition-all hover:shadow-lg border border-gray-100">
                <div className="px-4 py-5 sm:p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-purple-100 rounded-md p-3">
                      <FiShield className="h-6 w-6 text-purple-600" />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="truncate text-sm font-medium text-gray-500">Tổng Số HLV</dt>
                        <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">{stats.totalStaff}</dd>
                      </dl>
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <FiBarChart2 className="h-4 w-4 mr-1" />
                      <span className="font-medium">Huấn luyện viên khác nhau</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Memberships */}
              <div className="overflow-hidden rounded-xl bg-white shadow-md transition-all hover:shadow-lg border border-gray-100">
                <div className="px-4 py-5 sm:p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-blue-100 rounded-md p-3">
                      <FiPackage className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="truncate text-sm font-medium text-gray-500">Gói Tập</dt>
                        <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">{stats.totalMemberships}</dd>
                      </dl>
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="flex items-center text-sm text-blue-600">
                      <FiGrid className="h-4 w-4 mr-1" />
                      <span className="font-medium">Các loại gói tập khác nhau</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Total Revenue */}
              <div className="overflow-hidden rounded-xl bg-white shadow-md transition-all hover:shadow-lg border border-gray-100">
                <div className="px-4 py-5 sm:p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-green-100 rounded-md p-3">
                      <FiDollarSign className="h-6 w-6 text-green-600" />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="truncate text-sm font-medium text-gray-500">Tổng Doanh Thu</dt>
                        <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">{formatCurrency(stats.revenue)}</dd>
                      </dl>
                    </div>
                  </div>

                </div>
              </div>
            </div>

            {/* Management Modules */}
            <h2 className="mb-6 text-2xl font-bold text-gray-800 flex items-center">
              <FiSettings className="mr-2" />
              Quản Lý Hệ Thống
            </h2>
            
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
              {/* Users Management */}
              <button
                onClick={handleManageUsers}
                className="group flex flex-col items-center rounded-xl bg-white p-6 shadow-md transition-all hover:shadow-lg hover:bg-gradient-to-br hover:from-indigo-50 hover:to-indigo-100 border border-gray-100"
              >
                <div className="rounded-full bg-indigo-100 p-3 group-hover:bg-indigo-200 transition-colors">
                  <FiUsers className="h-8 w-8 text-indigo-600" />
                </div>
                <h3 className="mt-4 text-lg font-medium text-gray-900">Quản Lý Người Dùng</h3>
                <p className="mt-2 text-sm text-gray-500 text-center">Quản lý tài khoản thành viên và nhân viên</p>
                <div className="mt-4 inline-flex items-center text-sm font-medium text-indigo-600">
                  Xem chi tiết
                  <svg className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </button>
              
              {/* Memberships Management */}
              <button
                onClick={handleManageMemberships}
                className="group flex flex-col items-center rounded-xl bg-white p-6 shadow-md transition-all hover:shadow-lg hover:bg-gradient-to-br hover:from-blue-50 hover:to-blue-100 border border-gray-100"
              >
                <div className="rounded-full bg-blue-100 p-3 group-hover:bg-blue-200 transition-colors">
                  <FiPackage className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="mt-4 text-lg font-medium text-gray-900">Gói Tập</h3>
                <p className="mt-2 text-sm text-gray-500 text-center">Quản lý các gói tập và dịch vụ</p>
                <div className="mt-4 inline-flex items-center text-sm font-medium text-blue-600">
                  Xem chi tiết
                  <svg className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </button>
              
              {/* Subscriptions Management */}
              <button
                onClick={handleManageSubscriptions}
                className="group flex flex-col items-center rounded-xl bg-white p-6 shadow-md transition-all hover:shadow-lg hover:bg-gradient-to-br hover:from-purple-50 hover:to-purple-100 border border-gray-100"
              >
                <div className="rounded-full bg-purple-100 p-3 group-hover:bg-purple-200 transition-colors">
                  <FiCreditCard className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="mt-4 text-lg font-medium text-gray-900">Đăng Ký</h3>
                <p className="mt-2 text-sm text-gray-500 text-center">Quản lý đăng ký và thanh toán</p>
                <div className="mt-4 inline-flex items-center text-sm font-medium text-purple-600">
                  Xem chi tiết
                  <svg className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </button>
              
              {/* Attendance Management */}
              <button
                onClick={handleManageAttendance}
                className="group flex flex-col items-center rounded-xl bg-white p-6 shadow-md transition-all hover:shadow-lg hover:bg-gradient-to-br hover:from-green-50 hover:to-green-100 border border-gray-100"
              >
                <div className="rounded-full bg-green-100 p-3 group-hover:bg-green-200 transition-colors">
                  <FiCalendar className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="mt-4 text-lg font-medium text-gray-900">Điểm Danh</h3>
                <p className="mt-2 text-sm text-gray-500 text-center">Xem và quản lý lịch sử điểm danh</p>
                <div className="mt-4 inline-flex items-center text-sm font-medium text-green-600">
                  Xem chi tiết
                  <svg className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </button>
              
              {/* Equipment Management */}
              <button
                onClick={handleManageEquipment}
                className="group flex flex-col items-center rounded-xl bg-white p-6 shadow-md transition-all hover:shadow-lg hover:bg-gradient-to-br hover:from-amber-50 hover:to-amber-100 border border-gray-100"
              >
                <div className="rounded-full bg-amber-100 p-3 group-hover:bg-amber-200 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                </div>
                <h3 className="mt-4 text-lg font-medium text-gray-900">Thiết Bị</h3>
                <p className="mt-2 text-sm text-gray-500 text-center">Quản lý thiết bị và bảo trì</p>
                <div className="mt-4 inline-flex items-center text-sm font-medium text-amber-600">
                  Xem chi tiết
                  <svg className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </button>
            </div>
            

          </>
        )}
      </main>
    </div>
  );
} 