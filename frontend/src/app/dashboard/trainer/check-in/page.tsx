'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { userAPI, attendanceAPI, subscriptionAPI } from '@/services/api';
import { motion } from 'framer-motion';
import { 
  FiArrowLeft, 
  FiUsers, 
  FiSearch,
  FiCheckCircle,
  FiClock,
  FiUser,
  FiCalendar,
  FiRefreshCw,
  FiLogIn,
  FiLogOut,
  FiUserCheck,
  FiUserX
} from 'react-icons/fi';

interface Member {
  id: string;
  name: string;
  email: string;
  phone?: string;
  membershipType?: string;
  profileImage?: string;
  isCheckedIn: boolean;
  lastCheckIn?: string;
  activeAttendanceId?: string;
  hasActiveSubscription?: boolean;
  subscription?: any;
}

interface CheckInRecord {
  id: string;
  memberId: string;
  memberName: string;
  checkInTime: string;
  checkOutTime?: string;
  status: 'checked-in' | 'checked-out';
}

export default function CheckInPage() {
  const { auth } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [members, setMembers] = useState<Member[]>([]);
  const [todayCheckIns, setTodayCheckIns] = useState<CheckInRecord[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (!auth.isAuthenticated) {
      router.push('/auth/login');
      return;
    }

    if (auth.user && auth.user.role !== 'trainer') {
      router.push(`/dashboard/${auth.user.role}`);
      return;
    }

    fetchData();
  }, [auth.isAuthenticated, auth.user, router]);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Fetch members, attendance data, and subscriptions in parallel
      const [membersResponse, attendanceResponse, subscriptionsResponse] = await Promise.all([
        userAPI.getAllUsers(),
        attendanceAPI.getAllAttendances(),
        subscriptionAPI.getAllSubscriptions().catch(() => ({ status: 'error', data: null }))
      ]);

      // Process members data
      if (membersResponse.status === 'success' && membersResponse.data?.users) {
        const allUsers = Array.isArray(membersResponse.data.users) 
          ? membersResponse.data.users 
          : [];
        
        // Filter only active members
        const activeMembers = allUsers.filter((user: any) => 
          user.role === 'member' && user.active
        );

        // Process attendance data
        let todayAttendances: any[] = [];
        if (attendanceResponse.status === 'success' && attendanceResponse.data?.attendances) {
          const allAttendances = Array.isArray(attendanceResponse.data.attendances) 
            ? attendanceResponse.data.attendances 
            : [];
          
          // Filter today's check-ins
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          const tomorrow = new Date(today);
          tomorrow.setDate(tomorrow.getDate() + 1);

          todayAttendances = allAttendances.filter((attendance: any) => {
            const checkInDate = new Date(attendance.checkInTime);
            return checkInDate >= today && checkInDate < tomorrow;
          });
        }

        // Process subscription data to get membership types
        let allSubscriptions: any[] = [];
        if (subscriptionsResponse.status === 'success' && subscriptionsResponse.data?.subscriptions) {
          allSubscriptions = Array.isArray(subscriptionsResponse.data.subscriptions) 
            ? subscriptionsResponse.data.subscriptions 
            : [];
        }

        // Tạo map để lookup subscription theo memberId (tương tự admin)
        const subscriptionMap = new Map();
        const currentDate = new Date();
        
        allSubscriptions.forEach((sub: any) => {
          // Subscription phải: active = true, chưa hết hạn, và đã thanh toán
          const isPaid = sub.paymentStatus === 'paid' || sub.paymentStatus === 'completed';
          if (sub.active === true && 
              new Date(sub.endDate) > currentDate && 
              isPaid) {
            subscriptionMap.set(sub.memberId, sub);
          }
        });

        // Chỉ lấy những thành viên có subscription active
        const membersWithSubscription = activeMembers.filter((user: any) => {
          return subscriptionMap.has(user.id);
        });

        // Map members with their check-in status and membership type
        const membersWithStatus = membersWithSubscription.map((user: any) => {
          // Find active attendance (checked in but not checked out)
          const activeAttendance = todayAttendances.find((attendance: any) => 
            attendance.memberId === user.id && !attendance.checkOutTime
          );

          // Find latest check-in for this member
          const memberAttendances = todayAttendances.filter((attendance: any) => 
            attendance.memberId === user.id
          );
          const latestAttendance = memberAttendances.sort((a: any, b: any) => 
            new Date(b.checkInTime).getTime() - new Date(a.checkInTime).getTime()
          )[0];

          // Get subscription info
          const activeSubscription = subscriptionMap.get(user.id);

          let membershipType = 'Chưa có gói tập';
          if (activeSubscription && activeSubscription.membership) {
            membershipType = activeSubscription.membership.name;
          } else if (activeSubscription) {
            // If subscription exists but no membership details, try to find by membershipId
            membershipType = 'Gói tập đã đăng ký';
          }

          return {
            id: user.id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            membershipType,
            profileImage: user.profileImage,
            isCheckedIn: !!activeAttendance,
            lastCheckIn: latestAttendance?.checkInTime,
            activeAttendanceId: activeAttendance?.id,
            hasActiveSubscription: true,
            subscription: activeSubscription
          };
        });

        // Create today's check-ins records
        const todayCheckInRecords = todayAttendances.map((attendance: any) => ({
          id: attendance.id,
          memberId: attendance.memberId,
          memberName: attendance.member?.name || 'Unknown Member',
          checkInTime: attendance.checkInTime,
          checkOutTime: attendance.checkOutTime,
          status: attendance.checkOutTime ? 'checked-out' as const : 'checked-in' as const
        }));

        setMembers(membersWithStatus);
        setTodayCheckIns(todayCheckInRecords);
      } else {
        setMembers([]);
        setTodayCheckIns([]);
      }
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Không thể tải dữ liệu. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    router.push('/dashboard/trainer');
  };

  const handleCheckIn = async (member: Member) => {
    if (isProcessing) return;
    
    setIsProcessing(true);
    try {
      if (member.isCheckedIn && member.activeAttendanceId) {
        // Check out
        const response = await attendanceAPI.checkOut(member.activeAttendanceId, {
          notes: `Check-out bởi trainer: ${auth.user?.name || 'Unknown'}`
        });
        
        if (response.status === 'success') {
          alert(`${member.name} đã check-out thành công!`);
          await fetchData(); // Refresh data
        } else {
          throw new Error(response.message || 'Check-out failed');
        }
      } else {
        // Check in
        const response = await attendanceAPI.checkIn({
          memberId: member.id,
          notes: `Check-in bởi trainer: ${auth.user?.name || 'Unknown'}`
        });
        
        if (response.status === 'success') {
          alert(`${member.name} đã check-in thành công!`);
          await fetchData(); // Refresh data
        } else {
          throw new Error(response.message || 'Check-in failed');
        }
      }
      
      setSelectedMember(null);
    } catch (error: any) {
      console.error('Error processing check-in:', error);
      
      let errorMessage = 'Có lỗi xảy ra. Vui lòng thử lại.';
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      alert(errorMessage);
    } finally {
      setIsProcessing(false);
    }
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('vi-VN', {
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const filteredMembers = members.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (member.phone && member.phone.includes(searchTerm))
  );

  const checkedInMembers = members.filter(member => member.isCheckedIn);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleBack}
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-700 bg-opacity-30 rounded-lg hover:bg-opacity-50 focus:outline-none transition-all duration-200"
              >
                <FiArrowLeft className="w-5 h-5 mr-2" />
                Về bảng điều khiển
              </motion.button>
              <h1 className="text-2xl font-bold text-white">Điểm Danh</h1>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={fetchData}
                disabled={loading}
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-white hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 disabled:opacity-50"
              >
                <FiRefreshCw className={`mr-2 h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                Làm mới
              </button>
            </div>
          </div>
        </div>
      </div>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
            <p className="mt-4 text-lg text-gray-600">Đang tải dữ liệu...</p>
          </div>
        ) : error ? (
          <div className="text-center py-16">
            <div className="rounded-full bg-red-100 p-3 mx-auto w-fit">
              <FiUserX className="h-8 w-8 text-red-600" />
            </div>
            <p className="mt-4 text-lg text-red-600">{error}</p>
            <button
              onClick={fetchData}
              className="mt-4 rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 transition-colors duration-200"
            >
              Thử lại
            </button>
          </div>
        ) : (
          <div>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-lg shadow p-4"
              >
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-green-100 mr-4">
                    <FiUserCheck className="text-green-600 h-6 w-6" />
                  </div>
                  <div>
                                    <p className="text-sm text-gray-500">Đang tập</p>
                <p className="text-xl font-semibold text-gray-900">{checkedInMembers.length}</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="bg-white rounded-lg shadow p-4"
              >
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-blue-100 mr-4">
                    <FiCalendar className="text-blue-600 h-6 w-6" />
                  </div>
                  <div>
                                    <p className="text-sm text-gray-500">Check-in hôm nay</p>
                <p className="text-xl font-semibold text-gray-900">{todayCheckIns.length}</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                className="bg-white rounded-lg shadow p-4"
              >
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-purple-100 mr-4">
                    <FiUsers className="text-purple-600 h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Thành viên có gói active</p>
                    <p className="text-xl font-semibold text-gray-900">{members.length}</p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Member Search & Check-in */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="px-6 py-4 bg-gradient-to-r from-blue-500 to-blue-600">
                  <h2 className="text-xl font-semibold text-white flex items-center">
                    <FiUsers className="mr-3 h-6 w-6" /> 
                    Danh Sách Thành Viên
                  </h2>
                </div>
                <div className="p-6">
                  {/* Search */}
                  <div className="relative mb-6">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <FiSearch className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      className="block w-full rounded-md border border-gray-300 bg-white py-2 pl-10 pr-3 text-gray-700 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                      placeholder="Tìm kiếm theo tên, email hoặc số điện thoại..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>

                  {/* Member List */}
                  {filteredMembers.length > 0 ? (
                    <div className="space-y-3 max-h-96 overflow-y-auto">
                      {filteredMembers.map((member, index) => (
                        <motion.div
                          key={member.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.05 }}
                          className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          <div className="flex items-center">
                            <div className="flex-shrink-0">
                              <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                                <FiUser className="h-5 w-5 text-blue-600" />
                              </div>
                            </div>
                            <div className="ml-4">
                              <p className="text-sm font-medium text-gray-900">
                                {member.name}
                              </p>
                              <p className="text-xs text-gray-500">
                                {member.email}
                              </p>
                              <p className="text-xs text-gray-500">
                                {member.membershipType} • {member.phone || 'Chưa có SĐT'}
                              </p>
                              {member.subscription && (
                                <p className="text-xs text-green-600">
                                  Hết hạn: {new Date(member.subscription.endDate).toLocaleDateString('vi-VN')}
                                </p>
                              )}
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            {member.isCheckedIn && (
                              <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                                Đang tập
                              </span>
                            )}
                            <button
                              onClick={() => handleCheckIn(member)}
                              disabled={isProcessing}
                              className={`inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-200 ${
                                member.isCheckedIn
                                  ? 'text-red-700 bg-red-100 hover:bg-red-200 focus:ring-red-500'
                                  : 'text-green-700 bg-green-100 hover:bg-green-200 focus:ring-green-500'
                              } ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                              {member.isCheckedIn ? (
                                <>
                                  <FiLogOut className="w-3 h-3 mr-1" />
                                  Check-out
                                </>
                              ) : (
                                <>
                                  <FiLogIn className="w-3 h-3 mr-1" />
                                  Check-in
                                </>
                              )}
                            </button>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <FiUsers className="mx-auto h-12 w-12 text-gray-400" />
                      <h3 className="mt-2 text-sm font-medium text-gray-900">
                        Không tìm thấy thành viên
                      </h3>
                      <p className="mt-1 text-sm text-gray-500">
                        Hãy thử với từ khóa khác hoặc kiểm tra lại gói tập của thành viên
                      </p>
                      <p className="mt-1 text-xs text-gray-400">
                        Chỉ hiển thị thành viên có gói tập active và đã thanh toán
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Today's Check-ins */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="px-6 py-4 bg-gradient-to-r from-green-500 to-green-600">
                  <h2 className="text-xl font-semibold text-white flex items-center">
                    <FiCheckCircle className="mr-3 h-6 w-6" /> 
                    Check-in Hôm Nay
                  </h2>
                </div>
                <div className="p-6">
                  {todayCheckIns.length > 0 ? (
                    <div className="space-y-3 max-h-96 overflow-y-auto">
                      {todayCheckIns.map((record, index) => (
                        <motion.div
                          key={record.id}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.05 }}
                          className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                        >
                          <div>
                            <p className="text-sm font-medium text-gray-900">
                              {record.memberName}
                            </p>
                            <p className="text-xs text-gray-500">
                              Vào: {formatTime(record.checkInTime)}
                            </p>
                            {record.checkOutTime && (
                              <p className="text-xs text-gray-500">
                                Ra: {formatTime(record.checkOutTime)}
                              </p>
                            )}
                          </div>
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            record.status === 'checked-in'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-blue-100 text-blue-800'
                          }`}>
                            {record.status === 'checked-in' ? 'Đang tập' : 'Đã hoàn thành'}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <FiClock className="mx-auto h-12 w-12 text-gray-400" />
                      <h3 className="mt-2 text-sm font-medium text-gray-900">
                        Chưa có check-in nào hôm nay
                      </h3>
                      <p className="mt-1 text-sm text-gray-500">
                        Các lượt check-in hôm nay sẽ hiển thị ở đây
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
} 