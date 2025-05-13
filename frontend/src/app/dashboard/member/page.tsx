'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { subscriptionAPI, attendanceAPI } from '@/services/api';
import { Subscription, Attendance } from '@/types';
import { FiRefreshCw, FiUser, FiCalendar, FiClock, FiActivity, FiCheckCircle, FiCreditCard, FiChevronRight, FiAlertCircle, FiLogOut } from 'react-icons/fi';
import { motion } from 'framer-motion';

export default function MemberDashboard() {
  const { auth, refreshUserData, logout } = useAuth();
  const router = useRouter();
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [recentAttendance, setRecentAttendance] = useState<Attendance[]>([]);
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    if (auth.user && auth.user.id) {
      fetchMemberData();
    }
  }, [auth.user]);

  const fetchMemberData = async () => {
    try {
      setLoading(true);
      
      if (auth.user?.id) {
        // Fetch member's active subscription
        const subscriptionsResponse = await subscriptionAPI.getMemberSubscriptions(auth.user.id);
        // Ensure we're working with an array
        const subscriptionsArray: any[] = Array.isArray(subscriptionsResponse.data?.subscriptions) 
          ? subscriptionsResponse.data?.subscriptions 
          : [];
        
        // Get active subscription (most recent)
        const activeSubscriptions = subscriptionsArray
          .filter((sub: any) => sub.active)
          .sort((a: any, b: any) => new Date(b.endDate).getTime() - new Date(a.endDate).getTime());
        
        if (activeSubscriptions.length > 0) {
          setSubscription(activeSubscriptions[0] as Subscription);
        }
        
        // Fetch member's recent attendance
        const attendanceResponse = await attendanceAPI.getMemberAttendances(auth.user.id);
        const attendancesArray: any[] = Array.isArray(attendanceResponse.data?.attendances)
          ? attendanceResponse.data?.attendances
          : [];
        
        // Sort by most recent first and limit to 5
        const sortedAttendance = attendancesArray
          .sort((a: any, b: any) => new Date(b.checkInTime).getTime() - new Date(a.checkInTime).getTime())
          .slice(0, 5);
        
        setRecentAttendance(sortedAttendance as Attendance[]);
      }
    } catch (error) {
      console.error('Error fetching member data:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getDaysRemaining = (endDate: string) => {
    const end = new Date(endDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const diffTime = end.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const handleViewProfile = () => {
    router.push('/dashboard/member/profile');
  };

  const handleViewSubscriptions = () => {
    router.push('/dashboard/member/subscriptions');
  };
  
  const handleViewAttendance = () => {
    router.push('/dashboard/member/attendance');
  };

  const handleRefreshData = async () => {
    setIsRefreshing(true);
    await refreshUserData();
    await fetchMemberData();
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-center md:text-left mb-4 md:mb-0">
              <h1 className="text-3xl font-bold text-white">Tổng quan tài khoản</h1>
              <p className="mt-1 text-white">
                Xin chào, <span className="font-semibold">{auth.user?.name || 'Thành viên'}</span>!
              </p>
            </div>
            <div className="flex space-x-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleRefreshData}
                className="flex items-center px-4 py-2 bg-white text-indigo-700 font-medium rounded-lg hover:bg-indigo-50 transition-all duration-200 shadow-sm"
                title="Làm mới dữ liệu"
              >
                <FiRefreshCw className={`mr-2 ${isRefreshing ? 'animate-spin' : ''}`} /> 
                Làm mới dữ liệu
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={logout}
                className="flex items-center px-4 py-2 bg-white/10 text-white font-medium rounded-lg hover:bg-white/20 transition-all duration-200 shadow-sm border border-white/30"
                title="Đăng xuất"
              >
                <FiLogOut className="mr-2" /> 
                Đăng xuất
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-500"></div>
            <p className="mt-4 text-lg text-gray-600">Loading your information...</p>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-3">
            {/* Side Profile Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="md:col-span-1"
            >
              <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
                <div className="bg-gradient-to-r from-blue-500 to-indigo-600 px-6 py-4">
                  <div className="flex items-center justify-center">
                    <div className="h-20 w-20 bg-white rounded-full flex items-center justify-center text-indigo-600 text-2xl font-bold border-4 border-white shadow-md">
                      {auth.user?.name?.split(' ').map(n => n[0]).join('') || 'M'}
                    </div>
                  </div>
                </div>
                <div className="p-6 text-center">
                  <h2 className="text-xl font-semibold text-gray-800">{auth.user?.name || 'Thành viên'}</h2>
                  <p className="text-gray-500">{auth.user?.email || 'email@example.com'}</p>
                  
                  <div className="mt-6 flex justify-center">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleViewProfile}
                      className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200"
                    >
                      <FiUser className="mr-2" /> Xem hồ sơ
                    </motion.button>
                  </div>
                </div>
              </div>
              
              {/* Quick Links */}
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b">
                  <h3 className="font-medium text-gray-700">Truy cập nhanh</h3>
                </div>
                <div className="divide-y">
                  <motion.button 
                    whileHover={{ backgroundColor: "rgba(243, 244, 246, 1)" }}
                    onClick={handleViewSubscriptions}
                    className="w-full flex items-center justify-between px-6 py-4 text-left text-gray-700 hover:text-indigo-700"
                  >
                    <div className="flex items-center">
                      <div className="bg-indigo-100 rounded-full p-2 mr-3">
                        <FiCreditCard className="text-indigo-600" />
                      </div>
                      <span>Gói tập của tôi</span>
                    </div>
                    <FiChevronRight className="text-gray-400" />
                  </motion.button>
                  
                  <motion.button 
                    whileHover={{ backgroundColor: "rgba(243, 244, 246, 1)" }}
                    onClick={handleViewAttendance}
                    className="w-full flex items-center justify-between px-6 py-4 text-left text-gray-700 hover:text-green-700"
                  >
                    <div className="flex items-center">
                      <div className="bg-green-100 rounded-full p-2 mr-3">
                        <FiActivity className="text-green-600" />
                      </div>
                      <span>Điểm danh của tôi</span>
                    </div>
                    <FiChevronRight className="text-gray-400" />
                  </motion.button>
                  
                  <motion.button 
                    whileHover={{ backgroundColor: "rgba(243, 244, 246, 1)" }}
                    onClick={() => router.push('/membership')}
                    className="w-full flex items-center justify-between px-6 py-4 text-left text-gray-700 hover:text-purple-700"
                  >
                    <div className="flex items-center">
                      <div className="bg-purple-100 rounded-full p-2 mr-3">
                        <FiCheckCircle className="text-purple-600" />
                      </div>
                      <span>Danh sách gói tập</span>
                    </div>
                    <FiChevronRight className="text-gray-400" />
                  </motion.button>
                </div>
              </div>
            </motion.div>

            {/* Main Content */}
            <div className="md:col-span-2 space-y-6">
              {/* Membership Status */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-white rounded-xl shadow-sm overflow-hidden"
              >
                <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                  <h2 className="text-lg font-medium text-gray-800 flex items-center">
                    <FiCreditCard className="mr-2 text-indigo-600" /> 
                    Trạng thái gói tập
                  </h2>
                </div>
                
                <div className="p-6">
                  {subscription ? (
                    <div>
                      <div className="mb-6 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg p-4 text-white">
                        <div className="flex items-center">
                          <div className="bg-white bg-opacity-30 rounded-full p-2 mr-3">
                            <FiCheckCircle className="h-6 w-6" />
                          </div>
                          <div>
                            <p className="font-medium">Your membership is active</p>
                            <p className="text-sm opacity-90">Enjoy full access to all amenities</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="grid gap-6 sm:grid-cols-2">
                        <div className="bg-gray-50 rounded-lg p-4">
                          <h3 className="text-sm font-medium text-gray-500 flex items-center">
                            <FiCheckCircle className="mr-2 text-indigo-500" /> Membership Plan
                          </h3>
                          <p className="mt-1 text-lg font-medium text-gray-900">
                            {typeof subscription.membership === 'object' ? subscription.membership.name : 'Loading...'}
                          </p>
                        </div>
                        
                        <div className="bg-gray-50 rounded-lg p-4">
                          <h3 className="text-sm font-medium text-gray-500 flex items-center">
                            <FiCalendar className="mr-2 text-indigo-500" /> Expiry Date
                          </h3>
                          <p className="mt-1 text-lg font-medium text-gray-900">
                            {formatDate(subscription.endDate)}
                          </p>
                          <div className="mt-1 flex items-center">
                            <span className="inline-flex items-center rounded-full bg-indigo-100 px-2.5 py-0.5 text-xs font-medium text-indigo-800">
                              {getDaysRemaining(subscription.endDate)} days remaining
                            </span>
                          </div>
                        </div>
                        
                        <div className="bg-gray-50 rounded-lg p-4">
                          <h3 className="text-sm font-medium text-gray-500 flex items-center">
                            <FiCreditCard className="mr-2 text-indigo-500" /> Payment Status
                          </h3>
                          <p className={`mt-1 flex items-center ${
                            subscription.paymentStatus === 'completed' ? 'text-green-600' : 
                            subscription.paymentStatus === 'pending' ? 'text-yellow-600' : 'text-red-600'
                          }`}>
                            <span className={`mr-1.5 flex h-2 w-2 rounded-full ${
                              subscription.paymentStatus === 'completed' ? 'bg-green-500' : 
                              subscription.paymentStatus === 'pending' ? 'bg-yellow-500' : 'bg-red-500'
                            }`}></span>
                            <span className="text-lg font-medium">
                              {subscription.paymentStatus.charAt(0).toUpperCase() + subscription.paymentStatus.slice(1)}
                            </span>
                          </p>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-4">
                          <h3 className="text-sm font-medium text-gray-500 flex items-center">
                            <FiCalendar className="mr-2 text-indigo-500" /> Start Date
                          </h3>
                          <p className="mt-1 text-lg font-medium text-gray-900">
                            {formatDate(subscription.startDate)}
                          </p>
                        </div>
                      </div>
                      
                      <div className="mt-6 flex justify-end">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={handleViewSubscriptions}
                          className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200"
                        >
                          Xem tất cả gói tập <FiChevronRight className="ml-1" />
                        </motion.button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-yellow-100">
                        <FiAlertCircle className="h-8 w-8 text-yellow-600" />
                      </div>
                      <h3 className="mt-4 text-lg font-medium text-gray-900">Không có gói tập nào đang hoạt động</h3>
                      <p className="mt-1 text-gray-500">Bạn chưa có gói tập nào đang hoạt động.</p>
                      <div className="mt-6">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => router.push('/membership')}
                          className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200"
                        >
                          Xem danh sách gói tập <FiChevronRight className="ml-1" />
                        </motion.button>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>

              {/* Recent Attendance */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-white rounded-xl shadow-sm overflow-hidden"
              >
                <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                  <h2 className="text-lg font-medium text-gray-800 flex items-center">
                    <FiActivity className="mr-2 text-indigo-600" /> 
                    Điểm danh gần đây
                  </h2>
                </div>
                
                <div className="p-6">
                  {recentAttendance.length > 0 ? (
                    <div>
                      <ul className="divide-y divide-gray-100">
                        {recentAttendance.map((attendance) => (
                          <li key={attendance.id} className="py-3">
                            <div className="flex items-center">
                              <div className={`flex-shrink-0 rounded-full p-2 ${
                                attendance.checkOutTime ? 'bg-green-100' : 'bg-yellow-100'
                              }`}>
                                <FiClock className={`h-5 w-5 ${
                                  attendance.checkOutTime ? 'text-green-600' : 'text-yellow-600'
                                }`} />
                              </div>
                              <div className="ml-3 flex-grow">
                                <p className="text-sm font-medium text-gray-900">
                                  {new Date(attendance.checkInTime).toLocaleString('vi-VN')}
                                </p>
                                <p className="text-sm text-gray-500">
                                  {attendance.checkOutTime ? 
                                    `Duration: ${attendance.duration} minutes` : 
                                    'Check-out pending'
                                  }
                                </p>
                              </div>
                              <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                attendance.checkOutTime ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                              }`}>
                                {attendance.checkOutTime ? 'Completed' : 'In Progress'}
                              </span>
                            </div>
                          </li>
                        ))}
                      </ul>
                      <div className="mt-6 flex justify-end">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={handleViewAttendance}
                          className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200"
                        >
                          Xem tất cả điểm danh <FiChevronRight className="ml-1" />
                        </motion.button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-gray-100">
                        <FiClock className="h-8 w-8 text-gray-400" />
                      </div>
                      <h3 className="mt-4 text-lg font-medium text-gray-900">Không có lịch sử điểm danh</h3>
                      <p className="mt-1 text-gray-500">Bạn chưa có lịch sử điểm danh nào.</p>
                    </div>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
