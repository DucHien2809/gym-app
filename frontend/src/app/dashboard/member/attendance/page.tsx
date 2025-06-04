'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { attendanceAPI } from '@/services/api';
import { motion } from 'framer-motion';
import { FiCalendar, FiClock, FiArrowLeft, FiFilter, FiSearch, FiActivity, FiCheckCircle, FiInfo } from 'react-icons/fi';

interface Attendance {
  id: string;
  memberId: string;
  checkInTime: string;
  checkOutTime?: string;
  duration?: number;
  notes?: string;
}

export default function MemberAttendance() {
  const { auth } = useAuth();
  const router = useRouter();
  const [attendances, setAttendances] = useState<Attendance[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    if (!auth.isAuthenticated) {
      router.push('/auth/login');
      return;
    }

    if (auth.user && auth.user.role !== 'member') {
      router.push(`/dashboard/${auth.user.role}`);
      return;
    }

    const fetchAttendances = async () => {
      try {
        setLoading(true);
        
        if (!auth.user?.id) {
          setError('Thông tin người dùng không có sẵn');
          setLoading(false);
          return;
        }
        
        // Fetch attendances from API
        const response = await attendanceAPI.getMemberAttendances(auth.user.id);
        if (response.status === 'success' && response.data?.attendances) {
          const attendanceData = response.data.attendances as unknown as Attendance[];
          setAttendances(attendanceData);
        } else {
          setError('Không thể tải dữ liệu điểm danh. Vui lòng thử lại sau.');
        }
      } catch (err) {
        console.error('Error fetching attendances:', err);
        setError('Không thể tải lịch sử điểm danh. Vui lòng thử lại sau.');
      } finally {
        setLoading(false);
      }
    };

    fetchAttendances();
  }, [auth.isAuthenticated, auth.user, router]);

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('vi-VN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('vi-VN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    }).format(date);
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('vi-VN', {
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const formatDuration = (minutes?: number) => {
    if (!minutes) return 'N/A';
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  const handleBack = () => {
    router.push('/dashboard/member');
  };

  // Lọc điểm danh theo từ khóa tìm kiếm, ngày và trạng thái
  const filteredAttendances = attendances.filter(attendance => {
    // Lọc theo từ khóa tìm kiếm trong ghi chú
    if (searchTerm && attendance.notes) {
      if (!attendance.notes.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }
    } else if (searchTerm && !attendance.notes) {
      // Nếu có từ khóa tìm kiếm nhưng không có ghi chú thì loại bỏ
      return false;
    }
    
    // Lọc theo trạng thái
    if (statusFilter === 'active' && attendance.checkOutTime) {
      return false;
    }
    if (statusFilter === 'completed' && !attendance.checkOutTime) {
      return false;
    }
    
    // Lọc theo ngày
    if (dateFilter) {
      const filterDate = new Date(dateFilter);
      const checkInDate = new Date(attendance.checkInTime);
      if (
        filterDate.getDate() !== checkInDate.getDate() ||
        filterDate.getMonth() !== checkInDate.getMonth() ||
        filterDate.getFullYear() !== checkInDate.getFullYear()
      ) {
        return false;
      }
    }
    
    return true;
  });
  
  // Tính tổng thời gian tập luyện
  const totalDuration = filteredAttendances
    .filter(a => a.duration)
    .reduce((sum, a) => sum + (a.duration || 0), 0);
    
  // Tính thời gian trung bình mỗi buổi tập
  const completedSessions = filteredAttendances.filter(a => a.checkOutTime).length;
  const averageDuration = completedSessions > 0 
    ? Math.round(totalDuration / completedSessions) 
    : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleBack}
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-700 bg-opacity-30 rounded-lg hover:bg-opacity-50 focus:outline-none transition-all duration-200"
              >
                <FiArrowLeft className="w-5 h-5 mr-2" />
                Về bảng điều khiển
              </motion.button>
              <h1 className="text-2xl font-bold text-white">Lịch sử điểm danh của tôi</h1>
            </div>
          </div>
        </div>
      </div>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-500"></div>
            <p className="mt-4 text-lg text-gray-600">Đang tải lịch sử điểm danh của bạn...</p>
          </div>
        ) : error ? (
          <div className="text-center py-16">
            <div className="rounded-full bg-red-100 p-3 mx-auto w-fit">
              <FiInfo className="h-8 w-8 text-red-600" />
            </div>
            <p className="mt-4 text-lg text-red-600">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700 transition-colors duration-200"
            >
              Thử lại
            </button>
          </div>
        ) : (
          <div>
            {/* Filters */}
            <div className="mb-6 flex flex-col sm:flex-row gap-4">
              <div className="relative flex-grow">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <FiSearch className="text-gray-400" />
                </div>
                <input
                  type="text"
                  className="block w-full rounded-md border border-gray-300 bg-white py-2 pl-10 pr-3 text-gray-700 placeholder-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Tìm kiếm trong ghi chú..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-2">
                <FiCalendar className="text-gray-400" />
                <input
                  type="date"
                  className="rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-gray-700 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-2">
                <FiFilter className="text-gray-400" />
                <select
                  className="rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-gray-700 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="all">Tất cả buổi tập</option>
                  <option value="active">Buổi tập đang diễn ra</option>
                  <option value="completed">Buổi tập đã hoàn thành</option>
                </select>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-sm overflow-hidden text-white p-6"
              >
                <div className="flex items-center mb-4">
                  <div className="p-2 bg-white bg-opacity-30 rounded-lg mr-4">
                    <FiActivity className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm opacity-80">Tổng số buổi tập</p>
                    <h3 className="text-2xl font-bold">{filteredAttendances.length}</h3>
                  </div>
                </div>
                <div className="h-2 bg-white bg-opacity-20 rounded-full overflow-hidden">
                  <div 
                    className="h-2 bg-white rounded-full" 
                    style={{ width: `${Math.min(100, (filteredAttendances.length / 10) * 100)}%` }}
                  ></div>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-sm overflow-hidden text-white p-6"
              >
                <div className="flex items-center mb-4">
                  <div className="p-2 bg-white bg-opacity-30 rounded-lg mr-4">
                    <FiCheckCircle className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm opacity-80">Buổi tập đã hoàn thành</p>
                    <h3 className="text-2xl font-bold">{completedSessions}</h3>
                  </div>
                </div>
                <div className="h-2 bg-white bg-opacity-20 rounded-full overflow-hidden">
                  <div 
                    className="h-2 bg-white rounded-full" 
                    style={{ width: `${filteredAttendances.length ? (completedSessions / filteredAttendances.length) * 100 : 0}%` }}
                  ></div>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-sm overflow-hidden text-white p-6"
              >
                <div className="flex items-center mb-4">
                  <div className="p-2 bg-white bg-opacity-30 rounded-lg mr-4">
                    <FiClock className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm opacity-80">Thời gian trung bình</p>
                    <h3 className="text-2xl font-bold">{formatDuration(averageDuration)}</h3>
                  </div>
                </div>
                <div className="h-2 bg-white bg-opacity-20 rounded-full overflow-hidden">
                  <div 
                    className="h-2 bg-white rounded-full" 
                    style={{ width: `${Math.min(100, (averageDuration / 180) * 100)}%` }}
                  ></div>
                </div>
              </motion.div>
            </div>

            {/* Attendance List */}
            {filteredAttendances.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-xl shadow-sm p-8 text-center"
              >
                <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-gray-100">
                  <FiClock className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="mt-4 text-lg font-medium text-gray-900">Không tìm thấy bản ghi điểm danh nào</h3>
                <p className="mt-1 text-gray-500">Hãy thử thay đổi bộ lọc hoặc kiểm tra lại sau</p>
              </motion.div>
            ) : (
              <div className="space-y-4">
                {filteredAttendances.map((attendance, index) => (
                  <motion.div
                    key={attendance.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200"
                  >
                    <div className="p-6">
                      <div className="flex items-center justify-between flex-wrap gap-4">
                        <div className="flex items-center">
                          <div className={`p-3 rounded-lg mr-4 ${
                            attendance.checkOutTime ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'
                          }`}>
                            <FiClock className="h-6 w-6" />
                          </div>
                          <div>
                            <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                              attendance.checkOutTime ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {attendance.checkOutTime ? 'Hoàn thành' : 'Đang diễn ra'}
                            </span>
                            <h3 className="text-lg font-medium text-gray-900 mt-1">
                              Buổi tập ngày {formatDate(attendance.checkInTime)}
                            </h3>
                            <p className="text-sm text-gray-500">
                              Vào: {formatTime(attendance.checkInTime)}
                              {attendance.checkOutTime && ` • Ra: ${formatTime(attendance.checkOutTime)}`}
                            </p>
                          </div>
                        </div>

                        <div className="flex-shrink-0">
                          {attendance.duration && (
                            <div className="text-right">
                              <p className="text-sm text-gray-500">Thời gian</p>
                              <p className="text-lg font-semibold text-indigo-600">{formatDuration(attendance.duration)}</p>
                            </div>
                          )}
                        </div>
                      </div>

                      {attendance.notes && (
                        <div className="mt-4 pt-4 border-t border-gray-100">
                          <p className="text-sm text-gray-500">Ghi chú:</p>
                          <p className="text-gray-700">{attendance.notes}</p>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
} 