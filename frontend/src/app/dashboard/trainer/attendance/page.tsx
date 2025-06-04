'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { attendanceAPI } from '@/services/api';
import { motion } from 'framer-motion';
import { 
  FiArrowLeft, 
  FiCalendar, 
  FiClock, 
  FiUsers, 
  FiFilter, 
  FiSearch,
  FiCheckCircle,
  FiX,
  FiRefreshCw,
  FiDownload,
  FiEye
} from 'react-icons/fi';

interface AttendanceRecord {
  id: string;
  memberId: string;
  memberName: string;
  memberEmail: string;
  checkInTime: string;
  checkOutTime?: string;
  date: string;
  duration?: number;
  status: 'checked-in' | 'checked-out';
  notes?: string;
}

interface AttendanceStats {
  totalCheckIns: number;
  todayCheckIns: number;
  thisWeekCheckIns: number;
  thisMonthCheckIns: number;
  averageDuration: number;
}

export default function AttendancePage() {
  const { auth } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([]);
  const [stats, setStats] = useState<AttendanceStats>({
    totalCheckIns: 0,
    todayCheckIns: 0,
    thisWeekCheckIns: 0,
    thisMonthCheckIns: 0,
    averageDuration: 0
  });
  const [error, setError] = useState<string | null>(null);
  
  // Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date-desc');

  useEffect(() => {
    if (!auth.isAuthenticated) {
      router.push('/auth/login');
      return;
    }

    if (auth.user && auth.user.role !== 'trainer') {
      router.push(`/dashboard/${auth.user.role}`);
      return;
    }

    fetchAttendanceData();
  }, [auth.isAuthenticated, auth.user, router]);

  const fetchAttendanceData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Fetch real attendance data from MongoDB
      const response = await attendanceAPI.getAllAttendances();
      
      if (response.status === 'success' && response.data?.attendances) {
        const allAttendances = Array.isArray(response.data.attendances) 
          ? response.data.attendances 
          : [];

        // Transform attendance data to match our interface
        const attendanceRecords: AttendanceRecord[] = allAttendances.map((attendance: any) => {
          const checkInDate = new Date(attendance.checkInTime);
          
          return {
            id: attendance.id,
            memberId: attendance.memberId,
            memberName: attendance.member?.name || 'Unknown Member',
            memberEmail: attendance.member?.email || 'No email',
            checkInTime: attendance.checkInTime,
            checkOutTime: attendance.checkOutTime,
            date: checkInDate.toISOString().split('T')[0], // YYYY-MM-DD format
            duration: attendance.duration,
            status: attendance.checkOutTime ? 'checked-out' as const : 'checked-in' as const,
            notes: attendance.notes
          };
        });

        // Calculate real statistics
        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const thisWeekStart = new Date(today);
        thisWeekStart.setDate(today.getDate() - today.getDay()); // Start of week (Sunday)
        const thisMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);

        const todayRecords = attendanceRecords.filter(record => {
          const recordDate = new Date(record.checkInTime);
          return recordDate >= today;
        });

        const thisWeekRecords = attendanceRecords.filter(record => {
          const recordDate = new Date(record.checkInTime);
          return recordDate >= thisWeekStart;
        });

        const thisMonthRecords = attendanceRecords.filter(record => {
          const recordDate = new Date(record.checkInTime);
          return recordDate >= thisMonthStart;
        });

        // Calculate average duration from completed sessions (those with check-out time)
        const completedSessions = attendanceRecords.filter(record => record.duration && record.duration > 0);
        const averageDuration = completedSessions.length > 0 
          ? Math.round(completedSessions.reduce((sum, record) => sum + (record.duration || 0), 0) / completedSessions.length)
          : 0;

        const calculatedStats: AttendanceStats = {
          totalCheckIns: attendanceRecords.length,
          todayCheckIns: todayRecords.length,
          thisWeekCheckIns: thisWeekRecords.length,
          thisMonthCheckIns: thisMonthRecords.length,
          averageDuration
        };

        setAttendanceRecords(attendanceRecords);
        setStats(calculatedStats);
      } else {
        // No data found
        setAttendanceRecords([]);
        setStats({
          totalCheckIns: 0,
          todayCheckIns: 0,
          thisWeekCheckIns: 0,
          thisMonthCheckIns: 0,
          averageDuration: 0
        });
      }
    } catch (err) {
      console.error('Error fetching attendance data:', err);
      setError('Không thể tải dữ liệu điểm danh. Vui lòng thử lại.');
      setAttendanceRecords([]);
      setStats({
        totalCheckIns: 0,
        todayCheckIns: 0,
        thisWeekCheckIns: 0,
        thisMonthCheckIns: 0,
        averageDuration: 0
      });
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    router.push('/dashboard/trainer');
  };

  const formatDateTime = (dateTimeString: string) => {
    const date = new Date(dateTimeString);
    return new Intl.DateTimeFormat('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const formatDuration = (minutes?: number) => {
    if (!minutes) return '-';
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  const filteredRecords = attendanceRecords.filter(record => {
    // Filter by search term
    if (searchTerm && !record.memberName.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !record.memberEmail.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    
    // Filter by date
    if (dateFilter && record.date !== dateFilter) {
      return false;
    }
    
    // Filter by status
    if (statusFilter !== 'all' && record.status !== statusFilter) {
      return false;
    }
    
    return true;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'date-desc':
        return new Date(b.checkInTime).getTime() - new Date(a.checkInTime).getTime();
      case 'date-asc':
        return new Date(a.checkInTime).getTime() - new Date(b.checkInTime).getTime();
      case 'name-asc':
        return a.memberName.localeCompare(b.memberName);
      case 'name-desc':
        return b.memberName.localeCompare(a.memberName);
      default:
        return 0;
    }
  });

  const exportToCSV = () => {
    const headers = ['Tên thành viên', 'Email', 'Ngày', 'Giờ vào', 'Giờ ra', 'Thời gian tập', 'Trạng thái', 'Ghi chú'];
    const csvData = filteredRecords.map(record => [
      record.memberName,
      record.memberEmail,
      record.date,
      formatDateTime(record.checkInTime),
      record.checkOutTime ? formatDateTime(record.checkOutTime) : '-',
      formatDuration(record.duration),
      record.status === 'checked-in' ? 'Đang tập' : 'Đã hoàn thành',
      record.notes || '-'
    ]);
    
    const csvContent = [headers, ...csvData]
      .map(row => row.map(field => `"${field}"`).join(','))
      .join('\n');
      
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `attendance_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-teal-600 shadow-lg">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleBack}
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-green-700 bg-opacity-30 rounded-lg hover:bg-opacity-50 focus:outline-none transition-all duration-200"
              >
                <FiArrowLeft className="w-5 h-5 mr-2" />
                Về bảng điều khiển
              </motion.button>
              <h1 className="text-2xl font-bold text-white">Lịch Sử Điểm Danh</h1>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={exportToCSV}
                disabled={filteredRecords.length === 0}
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-green-700 bg-white hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <FiDownload className="mr-2 h-4 w-4" />
                Xuất CSV
              </button>
              <button
                onClick={fetchAttendanceData}
                disabled={loading}
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-green-700 bg-white hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-200 disabled:opacity-50"
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
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-green-500"></div>
            <p className="mt-4 text-lg text-gray-600">Đang tải dữ liệu điểm danh...</p>
          </div>
        ) : error ? (
          <div className="text-center py-16">
            <div className="rounded-full bg-red-100 p-3 mx-auto w-fit">
              <FiX className="h-8 w-8 text-red-600" />
            </div>
            <p className="mt-4 text-lg text-red-600">{error}</p>
            <button
              onClick={fetchAttendanceData}
              className="mt-4 rounded-md bg-green-600 px-4 py-2 text-white hover:bg-green-700 transition-colors duration-200"
            >
              Thử lại
            </button>
          </div>
        ) : (
          <div>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-lg shadow p-4"
              >
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-blue-100 mr-4">
                    <FiCheckCircle className="text-blue-600 h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Tổng lượt</p>
                    <p className="text-xl font-semibold text-gray-900">{stats.totalCheckIns}</p>
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
                  <div className="p-3 rounded-full bg-green-100 mr-4">
                    <FiCalendar className="text-green-600 h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Hôm nay</p>
                    <p className="text-xl font-semibold text-gray-900">{stats.todayCheckIns}</p>
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
                    <p className="text-sm text-gray-500">Tuần này</p>
                    <p className="text-xl font-semibold text-gray-900">{stats.thisWeekCheckIns}</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.3 }}
                className="bg-white rounded-lg shadow p-4"
              >
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-yellow-100 mr-4">
                    <FiCalendar className="text-yellow-600 h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Tháng này</p>
                    <p className="text-xl font-semibold text-gray-900">{stats.thisMonthCheckIns}</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.4 }}
                className="bg-white rounded-lg shadow p-4"
              >
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-indigo-100 mr-4">
                    <FiClock className="text-indigo-600 h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">TB thời gian</p>
                    <p className="text-xl font-semibold text-gray-900">{formatDuration(stats.averageDuration)}</p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* Search */}
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <FiSearch className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    className="block w-full rounded-md border border-gray-300 bg-white py-2 pl-10 pr-3 text-gray-700 placeholder-gray-400 focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm"
                    placeholder="Tìm kiếm thành viên..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                {/* Date Filter */}
                <div className="relative">
                  <input
                    type="date"
                    className="block w-full rounded-md border border-gray-300 bg-white py-2 px-3 text-gray-700 focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm"
                    value={dateFilter}
                    onChange={(e) => setDateFilter(e.target.value)}
                  />
                </div>

                {/* Status Filter */}
                <div className="relative">
                  <select
                    className="block w-full rounded-md border border-gray-300 bg-white py-2 px-3 text-gray-700 focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                  >
                    <option value="all">Tất cả trạng thái</option>
                    <option value="checked-in">Đang tập</option>
                    <option value="checked-out">Đã hoàn thành</option>
                  </select>
                </div>

                {/* Sort */}
                <div className="relative">
                  <select
                    className="block w-full rounded-md border border-gray-300 bg-white py-2 px-3 text-gray-700 focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                  >
                    <option value="date-desc">Mới nhất</option>
                    <option value="date-asc">Cũ nhất</option>
                    <option value="name-asc">Tên A-Z</option>
                    <option value="name-desc">Tên Z-A</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Attendance Table */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="px-6 py-4 bg-gradient-to-r from-green-500 to-teal-500">
                <h2 className="text-xl font-semibold text-white flex items-center">
                  <FiCheckCircle className="mr-3 h-6 w-6" /> 
                  Lịch Sử Điểm Danh ({filteredRecords.length} bản ghi)
                </h2>
              </div>
              
              {filteredRecords.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Thành viên
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Thời gian vào
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Thời gian ra
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Thời gian tập
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Trạng thái
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Ghi chú
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredRecords.map((record, index) => (
                        <motion.tr
                          key={record.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.05 }}
                          className="hover:bg-gray-50"
                        >
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div>
                              <div className="text-sm font-medium text-gray-900">
                                {record.memberName}
                              </div>
                              <div className="text-sm text-gray-500">
                                {record.memberEmail}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {formatDateTime(record.checkInTime)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {record.checkOutTime ? formatDateTime(record.checkOutTime) : '-'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {formatDuration(record.duration)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              record.status === 'checked-in'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-blue-100 text-blue-800'
                            }`}>
                              {record.status === 'checked-in' ? 'Đang tập' : 'Đã hoàn thành'}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-900">
                            {record.notes || '-'}
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-16">
                  <FiCheckCircle className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900">
                    Chưa có dữ liệu điểm danh
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    {searchTerm || dateFilter || statusFilter !== 'all' 
                      ? 'Không tìm thấy kết quả phù hợp với bộ lọc.'
                      : 'Dữ liệu điểm danh sẽ hiển thị ở đây khi có thành viên check-in.'
                    }
                  </p>
                  {(searchTerm || dateFilter || statusFilter !== 'all') && (
                    <button
                      onClick={() => {
                        setSearchTerm('');
                        setDateFilter('');
                        setStatusFilter('all');
                      }}
                      className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-green-700 bg-green-100 hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    >
                      Xóa bộ lọc
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
} 