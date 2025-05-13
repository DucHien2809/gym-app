'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { attendanceAPI } from '@/services/api';
import { FiPlus, FiSearch, FiFilter, FiEdit, FiTrash2, FiArrowLeft, FiCheck, FiX, FiClock, FiUser, FiCalendar, FiActivity } from 'react-icons/fi';

interface Attendance {
  id: string;
  memberId: string;
  checkInTime: string;
  checkOutTime?: string;
  duration?: number;
  notes?: string;
  member: {
    name: string;
    email: string;
    phone?: string;
    avatar?: string;
  };
}

// Dữ liệu mẫu cho phát triển
const sampleAttendances: Attendance[] = [
  {
    id: '1',
    memberId: 'member1',
    checkInTime: '2023-11-10T08:30:00',
    checkOutTime: '2023-11-10T10:15:00',
    duration: 105, // phút
    notes: 'Tập luyện chăm chỉ',
    member: {
      name: 'Nguyễn Văn A',
      email: 'nguyenvana@gmail.com',
      phone: '0901234567',
      avatar: 'https://randomuser.me/api/portraits/men/1.jpg'
    }
  },
  {
    id: '2',
    memberId: 'member2',
    checkInTime: '2023-11-10T14:20:00',
    checkOutTime: '2023-11-10T16:00:00',
    duration: 100, // phút
    member: {
      name: 'Trần Thị B',
      email: 'tranthib@gmail.com',
      phone: '0912345678',
      avatar: 'https://randomuser.me/api/portraits/women/2.jpg'
    }
  },
  {
    id: '3',
    memberId: 'member3',
    checkInTime: '2023-11-10T18:00:00',
    notes: 'Đang tập luyện',
    member: {
      name: 'Lê Văn C',
      email: 'levanc@gmail.com',
      phone: '0923456789',
      avatar: 'https://randomuser.me/api/portraits/men/3.jpg'
    }
  },
  {
    id: '4',
    memberId: 'member4',
    checkInTime: '2023-11-09T09:45:00',
    checkOutTime: '2023-11-09T11:30:00',
    duration: 105, // phút
    member: {
      name: 'Phạm Thị D',
      email: 'phamthid@gmail.com',
      phone: '0934567890',
      avatar: 'https://randomuser.me/api/portraits/women/4.jpg'
    }
  },
  {
    id: '5',
    memberId: 'member5',
    checkInTime: '2023-11-09T15:30:00',
    checkOutTime: '2023-11-09T17:45:00',
    duration: 135, // phút
    member: {
      name: 'Hoàng Văn E',
      email: 'hoangvane@gmail.com',
      phone: '0945678901',
      avatar: 'https://randomuser.me/api/portraits/men/5.jpg'
    }
  }
];

export default function AttendanceManagement() {
  const { auth } = useAuth();
  const router = useRouter();
  const [attendances, setAttendances] = useState<Attendance[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('');
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedAttendanceId, setSelectedAttendanceId] = useState<string | null>(null);
  const [isClosing, setIsClosing] = useState(false);
  
  // States cho modal thêm/sửa điểm danh
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    memberId: '',
    memberName: '',
    memberEmail: '',
    memberPhone: '',
    checkInTime: '',
    checkOutTime: '',
    notes: ''
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  
  // Danh sách thành viên mẫu
  const [members, setMembers] = useState([
    { id: 'member1', name: 'Nguyễn Văn A', email: 'nguyenvana@gmail.com', phone: '0901234567' },
    { id: 'member2', name: 'Trần Thị B', email: 'tranthib@gmail.com', phone: '0912345678' },
    { id: 'member3', name: 'Lê Văn C', email: 'levanc@gmail.com', phone: '0923456789' },
    { id: 'member4', name: 'Phạm Thị D', email: 'phamthid@gmail.com', phone: '0934567890' },
    { id: 'member5', name: 'Hoàng Văn E', email: 'hoangvane@gmail.com', phone: '0945678901' },
    { id: 'member6', name: 'Võ Thị F', email: 'vothif@gmail.com', phone: '0956789012' }
  ]);

  useEffect(() => {
    // Kiểm tra xác thực
    if (!auth.isAuthenticated) {
      router.push('/auth/login');
      return;
    }

    // Kiểm tra vai trò
    if (auth.user && auth.user.role !== 'admin') {
      router.push(`/dashboard/${auth.user.role}`);
      return;
    }

    // Lấy dữ liệu điểm danh
    const fetchAttendances = async () => {
      try {
        setLoading(true);
        
        // Kiểm tra dữ liệu trong localStorage
        const savedAttendances = localStorage.getItem('gymAttendances');
        if (savedAttendances) {
          setAttendances(JSON.parse(savedAttendances));
          setLoading(false);
          return;
        }

        // Gọi API
        const response = await attendanceAPI.getAllAttendances();
        if (response.status === 'success' && response.data?.attendances) {
          const attendancesData = response.data.attendances as unknown as Attendance[];
          setAttendances(attendancesData);
          localStorage.setItem('gymAttendances', JSON.stringify(attendancesData));
        } else {
          // Sử dụng dữ liệu mẫu khi API không trả về kết quả
          setAttendances(sampleAttendances);
          localStorage.setItem('gymAttendances', JSON.stringify(sampleAttendances));
        }
      } catch (err) {
        setError('Không thể tải dữ liệu điểm danh. Vui lòng thử lại sau.');
        console.error('Error fetching attendances:', err);
        
        // Sử dụng dữ liệu mẫu khi có lỗi
        setAttendances(sampleAttendances);
        localStorage.setItem('gymAttendances', JSON.stringify(sampleAttendances));
      } finally {
        setLoading(false);
      }
    };

    fetchAttendances();
  }, [auth.isAuthenticated, auth.user, router]);

  const handleBack = () => {
    router.push('/dashboard/admin');
  };

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

  const handleAddNew = () => {
    // Reset form
    setFormData({
      memberId: '',
      memberName: '',
      memberEmail: '',
      memberPhone: '',
      checkInTime: new Date().toISOString().slice(0, 16),
      checkOutTime: '',
      notes: ''
    });
    setFormErrors({});
    setIsEditing(false);
    setIsFormModalOpen(true);
  };

  const handleEdit = (id: string) => {
    const attendance = attendances.find(a => a.id === id);
    if (!attendance) return;
    
    setFormData({
      memberId: attendance.memberId,
      memberName: attendance.member.name,
      memberEmail: attendance.member.email,
      memberPhone: attendance.member.phone || '',
      checkInTime: attendance.checkInTime.slice(0, 16),
      checkOutTime: attendance.checkOutTime ? attendance.checkOutTime.slice(0, 16) : '',
      notes: attendance.notes || ''
    });
    
    setSelectedAttendanceId(id);
    setFormErrors({});
    setIsEditing(true);
    setIsFormModalOpen(true);
  };

  const handleDeleteClick = (id: string) => {
    setSelectedAttendanceId(id);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsDeleteModalOpen(false);
      setIsClosing(false);
    }, 200);
  };

  // Đóng modal form
  const closeFormModal = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsFormModalOpen(false);
      setIsClosing(false);
    }, 200);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // Cập nhật giá trị form
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Xóa lỗi khi người dùng nhập lại
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: ''
      });
    }
    
    // Cập nhật thông tin liên quan khi chọn thành viên
    if (name === 'memberId') {
      const member = members.find(m => m.id === value);
      if (member) {
        setFormData(prev => ({
          ...prev,
          memberId: value,
          memberName: member.name,
          memberEmail: member.email,
          memberPhone: member.phone || ''
        }));
      }
    }
  };

  // Validate form trước khi submit
  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};
    
    if (!formData.memberId) {
      errors.memberId = 'Vui lòng chọn thành viên';
    }
    
    if (!formData.checkInTime) {
      errors.checkInTime = 'Vui lòng chọn thời gian check-in';
    }
    
    if (formData.checkOutTime && new Date(formData.checkOutTime) <= new Date(formData.checkInTime)) {
      errors.checkOutTime = 'Thời gian check-out phải sau thời gian check-in';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Xử lý submit form
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Tính thời gian tập (nếu có check-out)
      let duration;
      if (formData.checkOutTime) {
        const checkInDate = new Date(formData.checkInTime);
        const checkOutDate = new Date(formData.checkOutTime);
        const diffMs = checkOutDate.getTime() - checkInDate.getTime();
        duration = Math.round(diffMs / 60000); // Convert to minutes
      }
      
      // Tạo đối tượng điểm danh mới
      const member = members.find(m => m.id === formData.memberId);
      
      if (!member) {
        throw new Error('Thông tin thành viên không hợp lệ');
      }
      
      const attendanceData: Partial<Attendance> = {
        memberId: formData.memberId,
        checkInTime: formData.checkInTime,
        checkOutTime: formData.checkOutTime || undefined,
        duration,
        notes: formData.notes,
        member: {
          name: member.name,
          email: member.email,
          phone: member.phone,
          avatar: `https://randomuser.me/api/portraits/${Math.random() > 0.5 ? 'men' : 'women'}/${Math.floor(Math.random() * 10) + 1}.jpg`
        }
      };
      
      // Giả lập gọi API
      setTimeout(() => {
        let updatedAttendances;
        
        if (isEditing && selectedAttendanceId) {
          // Cập nhật điểm danh
          updatedAttendances = attendances.map(attendance => {
            if (attendance.id === selectedAttendanceId) {
              return {
                ...attendance,
                ...attendanceData
              };
            }
            return attendance;
          });
          
          alert('Cập nhật điểm danh thành công!');
        } else {
          // Thêm mới điểm danh
          const newAttendance = {
            id: Date.now().toString(),
            ...attendanceData
          } as Attendance;
          
          updatedAttendances = [...attendances, newAttendance];
          alert('Thêm điểm danh mới thành công!');
        }
        
        // Cập nhật state và localStorage
        setAttendances(updatedAttendances);
        localStorage.setItem('gymAttendances', JSON.stringify(updatedAttendances));
        
        // Đóng modal
        closeFormModal();
        setIsSubmitting(false);
      }, 1000);
      
    } catch (error) {
      console.error('Error handling attendance:', error);
      alert('Có lỗi xảy ra. Vui lòng thử lại sau.');
      setIsSubmitting(false);
    }
  };

  const handleDeleteConfirm = () => {
    if (!selectedAttendanceId) return;
    
    const updatedAttendances = attendances.filter(
      attendance => attendance.id !== selectedAttendanceId
    );
    
    setAttendances(updatedAttendances);
    localStorage.setItem('gymAttendances', JSON.stringify(updatedAttendances));
    
    closeDeleteModal();
    alert('Đã xóa điểm danh thành công!');
  };

  // Lọc điểm danh theo trạng thái, ngày và từ khóa tìm kiếm
  const filteredAttendances = attendances.filter(attendance => {
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
    
    // Lọc theo từ khóa tìm kiếm (tên, email)
    if (searchTerm && !attendance.member.name.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !attendance.member.email.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 shadow-md">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={handleBack}
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-700 bg-opacity-30 border border-white border-opacity-20 rounded-md hover:bg-opacity-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200"
              >
                <FiArrowLeft className="w-5 h-5 mr-2" />
                Quay lại
              </button>
              <h1 className="text-2xl font-bold text-white">Quản lý điểm danh</h1>
            </div>
            <button
              onClick={handleAddNew}
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-700 bg-opacity-30 border border-white border-opacity-20 rounded-md hover:bg-opacity-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200"
            >
              <FiPlus className="w-5 h-5 mr-2" />
              Thêm điểm danh mới
            </button>
          </div>
        </div>
      </div>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-500"></div>
            <p className="mt-4 text-lg text-gray-600">Đang tải dữ liệu...</p>
          </div>
        ) : error ? (
          <div className="text-center py-16">
            <div className="rounded-full bg-red-100 p-3 mx-auto w-fit">
              <svg className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
              </svg>
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
            {/* Thanh tìm kiếm và bộ lọc */}
            <div className="mb-6 flex flex-col sm:flex-row gap-4">
              <div className="relative flex-grow">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <FiSearch className="text-gray-400" />
                </div>
                <input
                  type="text"
                  className="block w-full rounded-md border border-gray-300 bg-white py-2 pl-10 pr-3 text-gray-700 placeholder-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Tìm kiếm theo tên hoặc email..."
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
                  <option value="all">Tất cả trạng thái</option>
                  <option value="active">Đang tập luyện</option>
                  <option value="completed">Đã hoàn thành</option>
                </select>
              </div>
            </div>

            {/* Thông tin tổng số */}
            <div className="mb-6">
              <div className="rounded-lg bg-white p-4 shadow-sm">
                <div className="flex flex-wrap gap-4">
                  <div className="flex-grow rounded-md bg-blue-50 p-4">
                    <h3 className="text-sm font-medium text-blue-900">Tổng số điểm danh</h3>
                    <p className="mt-2 text-3xl font-bold text-blue-900">{filteredAttendances.length}</p>
                  </div>
                  <div className="flex-grow rounded-md bg-green-50 p-4">
                    <h3 className="text-sm font-medium text-green-900">Đã hoàn thành</h3>
                    <p className="mt-2 text-3xl font-bold text-green-900">
                      {filteredAttendances.filter(a => a.checkOutTime).length}
                    </p>
                  </div>
                  <div className="flex-grow rounded-md bg-yellow-50 p-4">
                    <h3 className="text-sm font-medium text-yellow-900">Đang tập luyện</h3>
                    <p className="mt-2 text-3xl font-bold text-yellow-900">
                      {filteredAttendances.filter(a => !a.checkOutTime).length}
                    </p>
                  </div>
                  <div className="flex-grow rounded-md bg-purple-50 p-4">
                    <h3 className="text-sm font-medium text-purple-900">Thời gian trung bình</h3>
                    <p className="mt-2 text-3xl font-bold text-purple-900">
                      {formatDuration(
                        Math.round(
                          filteredAttendances
                            .filter(a => a.duration)
                            .reduce((sum, a) => sum + (a.duration || 0), 0) / 
                            (filteredAttendances.filter(a => a.duration).length || 1)
                        )
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bảng điểm danh */}
            <div className="overflow-hidden rounded-lg bg-white shadow">
              {filteredAttendances.length === 0 ? (
                <div className="flex flex-col items-center justify-center p-8">
                  <div className="rounded-full bg-gray-100 p-3">
                    <svg className="h-8 w-8 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"></path>
                    </svg>
                  </div>
                  <p className="mt-4 text-lg text-gray-500">Không tìm thấy kết quả nào</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                          Thành viên
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                          Check-in
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                          Check-out
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                          Thời gian tập
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                          Trạng thái
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                          Hành động
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      {filteredAttendances.map((attendance) => (
                        <tr key={attendance.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4">
                            <div className="flex items-center">
                              <div className="h-10 w-10 flex-shrink-0">
                                <img 
                                  className="h-10 w-10 rounded-full object-cover" 
                                  src={attendance.member.avatar || 'https://via.placeholder.com/40'} 
                                  alt={attendance.member.name} 
                                />
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">{attendance.member.name}</div>
                                <div className="text-sm text-gray-500">{attendance.member.email}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm text-gray-900">{formatDate(attendance.checkInTime)}</div>
                            <div className="text-sm text-gray-500">{formatTime(attendance.checkInTime)}</div>
                          </td>
                          <td className="px-6 py-4">
                            {attendance.checkOutTime ? (
                              <>
                                <div className="text-sm text-gray-900">{formatDate(attendance.checkOutTime)}</div>
                                <div className="text-sm text-gray-500">{formatTime(attendance.checkOutTime)}</div>
                              </>
                            ) : (
                              <span className="text-sm text-gray-500">Chưa check-out</span>
                            )}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-500">
                            {formatDuration(attendance.duration)}
                          </td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                              attendance.checkOutTime 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {attendance.checkOutTime ? 'Đã hoàn thành' : 'Đang tập luyện'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div className="flex items-center space-x-2">
                              <button
                                onClick={() => handleEdit(attendance.id)}
                                className="text-indigo-600 hover:text-indigo-900 px-2 py-1 rounded hover:bg-indigo-50"
                              >
                                <FiEdit className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteClick(attendance.id)}
                                className="text-red-600 hover:text-red-900 px-2 py-1 rounded hover:bg-red-50"
                              >
                                <FiTrash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {/* Modal xác nhận xóa */}
      {isDeleteModalOpen && (
        <div className="fixed z-50 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            {/* Overlay */}
            <div 
              className={`fixed inset-0 bg-gray-500 transition-opacity ${isClosing ? 'bg-opacity-0' : 'bg-opacity-75'}`}
              style={{ transitionDuration: '200ms' }}
              aria-hidden="true" 
              onClick={closeDeleteModal}
            ></div>
            
            {/* Trick để căn giữa modal */}
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            
            {/* Modal Panel */}
            <div 
              className={`inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full ${isClosing ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}
              style={{ transitionDuration: '200ms' }}
            >
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <FiTrash2 className="h-6 w-6 text-red-600" />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Xóa điểm danh</h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Bạn có chắc chắn muốn xóa bản ghi điểm danh này? Thao tác này không thể hoàn tác.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button 
                  type="button" 
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={handleDeleteConfirm}
                >
                  Xóa
                </button>
                <button 
                  type="button" 
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={closeDeleteModal}
                >
                  Hủy
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal thêm/sửa điểm danh */}
      {isFormModalOpen && (
        <div className="fixed z-50 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            {/* Overlay */}
            <div 
              className={`fixed inset-0 bg-gray-500 transition-opacity ${isClosing ? 'bg-opacity-0' : 'bg-opacity-75'}`}
              style={{ transitionDuration: '200ms' }}
              aria-hidden="true" 
              onClick={closeFormModal}
            ></div>
            
            {/* Trick để căn giữa modal */}
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            
            {/* Modal Panel */}
            <div 
              className={`inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full ${isClosing ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}
              style={{ transitionDuration: '200ms' }}
            >
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-4 py-3 sm:px-6 flex justify-between items-center">
                <h3 className="text-lg leading-6 font-medium text-white">
                  {isEditing ? 'Sửa điểm danh' : 'Thêm điểm danh mới'}
                </h3>
                <button 
                  onClick={closeFormModal}
                  className="bg-transparent rounded-full p-1 inline-flex items-center justify-center text-white hover:bg-white hover:bg-opacity-20 focus:outline-none"
                >
                  <FiX className="h-5 w-5" />
                </button>
              </div>
              
              <form onSubmit={handleFormSubmit}>
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="space-y-4">
                    {/* Thành viên */}
                    <div>
                      <label htmlFor="memberId" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                        <FiUser className="mr-1 text-gray-600" /> Thành viên
                      </label>
                      <select
                        id="memberId"
                        name="memberId"
                        value={formData.memberId}
                        onChange={handleInputChange}
                        disabled={isEditing}
                        className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md text-gray-700 ${formErrors.memberId ? 'border-red-500' : ''}`}
                      >
                        <option value="">Chọn thành viên</option>
                        {members.map(member => (
                          <option key={member.id} value={member.id}>
                            {member.name} ({member.email})
                          </option>
                        ))}
                      </select>
                      {formErrors.memberId && (
                        <p className="mt-1 text-sm text-red-600">{formErrors.memberId}</p>
                      )}
                      
                      {formData.memberId && (
                        <div className="mt-2 p-2 bg-gray-50 rounded-md">
                          <p className="text-sm text-gray-700"><strong>Email:</strong> {formData.memberEmail}</p>
                          {formData.memberPhone && (
                            <p className="text-sm text-gray-700"><strong>Điện thoại:</strong> {formData.memberPhone}</p>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Thời gian check-in */}
                    <div>
                      <label htmlFor="checkInTime" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                        <FiClock className="mr-1 text-gray-600" /> Thời gian check-in
                      </label>
                      <input
                        type="datetime-local"
                        id="checkInTime"
                        name="checkInTime"
                        value={formData.checkInTime}
                        onChange={handleInputChange}
                        className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md text-gray-700 ${formErrors.checkInTime ? 'border-red-500' : ''}`}
                      />
                      {formErrors.checkInTime && (
                        <p className="mt-1 text-sm text-red-600">{formErrors.checkInTime}</p>
                      )}
                    </div>

                    {/* Thời gian check-out */}
                    <div>
                      <label htmlFor="checkOutTime" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                        <FiClock className="mr-1 text-gray-600" /> Thời gian check-out (để trống nếu chưa check-out)
                      </label>
                      <input
                        type="datetime-local"
                        id="checkOutTime"
                        name="checkOutTime"
                        value={formData.checkOutTime}
                        onChange={handleInputChange}
                        className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md text-gray-700 ${formErrors.checkOutTime ? 'border-red-500' : ''}`}
                      />
                      {formErrors.checkOutTime && (
                        <p className="mt-1 text-sm text-red-600">{formErrors.checkOutTime}</p>
                      )}
                    </div>

                    {/* Ghi chú */}
                    <div>
                      <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
                        Ghi chú
                      </label>
                      <textarea
                        id="notes"
                        name="notes"
                        rows={3}
                        value={formData.notes}
                        onChange={handleInputChange}
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md text-gray-700"
                        placeholder="Nhập ghi chú nếu có..."
                      />
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Đang xử lý...
                      </>
                    ) : isEditing ? 'Cập nhật' : 'Thêm điểm danh'}
                  </button>
                  <button
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={closeFormModal}
                    disabled={isSubmitting}
                  >
                    Hủy
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 