'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { userAPI } from '@/services/api';
import { User } from '@/types';
import { 
  FiArrowLeft, 
  FiRefreshCw, 
  FiUser, 
  FiMail, 
  FiShield, 
  FiEdit2,
  FiSearch,
  FiFilter,
  FiChevronLeft,
  FiChevronRight,
  FiEye,
  FiLock,
  FiUnlock,
  FiKey,
  FiSend
} from 'react-icons/fi';

export default function UserManagement() {
  const { auth } = useAuth();
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Helper function to get user avatar
  const getUserAvatar = (user: User) => {
    if (user.profileImage) {
      return `http://localhost:5000${user.profileImage}`;
    }
    return null;
  };
  
  // Helper function to get user initials
  const getUserInitials = (name: string) => {
    return name.charAt(0).toUpperCase();
  };
  
  // Avatar component
  const UserAvatar = ({ user, size = 'sm' }: { user: User; size?: 'sm' | 'lg' }) => {
    const [imageError, setImageError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    
    const sizeClasses = {
      sm: 'h-10 w-10',
      lg: 'h-16 w-16'
    };
    
    const textSizeClasses = {
      sm: 'font-medium',
      lg: 'text-xl font-bold'
    };
    
    const borderClasses = {
      sm: 'border-2 border-gray-200',
      lg: 'border-4 border-white shadow-md'
    };
    
    const avatarUrl = getUserAvatar(user);
    
    if (!avatarUrl || imageError) {
      return (
        <div className={`${sizeClasses[size]} rounded-full flex items-center justify-center ${
          size === 'lg' ? 'bg-white' : 'bg-gradient-to-r from-indigo-500 to-purple-500'
        }`}>
          <span className={`${size === 'lg' ? 'text-indigo-600' : 'text-white'} ${textSizeClasses[size]}`}>
            {getUserInitials(user.name)}
          </span>
        </div>
      );
    }
    
    return (
      <div className={`${sizeClasses[size]} rounded-full relative`}>
        {isLoading && (
          <div className={`${sizeClasses[size]} rounded-full bg-gray-200 flex items-center justify-center absolute inset-0 z-10`}>
            <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-indigo-500"></div>
          </div>
        )}
        <img 
          src={avatarUrl}
          alt={user.name}
          className={`${sizeClasses[size]} rounded-full object-cover ${borderClasses[size]}`}
          onLoad={() => setIsLoading(false)}
          onLoadStart={() => setIsLoading(true)}
          onError={() => {
            setImageError(true);
            setIsLoading(false);
          }}
        />
      </div>
    );
  };
  
  // States cho tìm kiếm và lọc
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  
  // States cho phân trang
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;
  
  // State cho modal chi tiết
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [isBrowser, setIsBrowser] = useState(false);
  


  // Set isBrowser to true when component mounts
  useEffect(() => {
    setIsBrowser(true);
  }, []);

  // Effect to ensure modal is properly handled
  useEffect(() => {
    if (showModal) {
      // Prevent body scrolling when modal is open
      document.body.style.overflow = 'hidden';
    } else {
      // Re-enable scrolling when modal is closed
      document.body.style.overflow = 'unset';
    }
    
    // Clean up function
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showModal]);

  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      const response = await userAPI.getAllUsers();
      if (response.status === 'success' && Array.isArray(response.data?.users)) {
        setUsers(response.data.users);
        setFilteredUsers(response.data.users);
      } else {
        setUsers([]);
        setFilteredUsers([]);
      }
    } catch (err) {
      setError('Không thể tải dữ liệu người dùng. Vui lòng thử lại sau.');
      console.error('Error fetching users:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (auth.user && auth.user.id) {
      if (auth.user.role !== 'admin') {
        router.push(`/dashboard/${auth.user.role}`);
        return;
      }
      fetchUsers();
    }
  }, [auth.user, router, fetchUsers]);

  // Xử lý tìm kiếm và lọc
  useEffect(() => {
    let result = [...users];
    
    // Lọc theo từ khóa tìm kiếm
    if (searchTerm) {
      result = result.filter(user => 
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Lọc theo vai trò
    if (roleFilter !== 'all') {
      result = result.filter(user => user.role === roleFilter);
    }
    
    // Lọc theo trạng thái
    if (statusFilter !== 'all') {
      result = result.filter(user => user.active === (statusFilter === 'active'));
    }
    
    setFilteredUsers(result);
    setCurrentPage(1); // Reset về trang 1 khi thay đổi bộ lọc
  }, [users, searchTerm, roleFilter, statusFilter]);

  // Tính toán phân trang
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const handleBack = () => {
    router.push('/dashboard/admin');
  };

  const handleRoleChange = async (userId: string, newRole: 'member' | 'trainer') => {
    try {
      const response = await userAPI.changeUserRole(userId, newRole);
      if (response.status === 'success') {
        fetchUsers();
      }
    } catch (error) {
      console.error('Error changing user role:', error);
      alert('Không thể thay đổi vai trò người dùng');
    }
  };

  const handleToggleStatus = async (userId: string, currentStatus: boolean) => {
    try {
      const response = await userAPI.updateUser(userId, { active: !currentStatus });
      if (response.status === 'success') {
        fetchUsers();
      }
    } catch (error) {
      console.error('Error toggling user status:', error);
      alert('Không thể thay đổi trạng thái người dùng');
    }
  };

  const handleResetPassword = async (userId: string) => {
    const user = users.find(u => u.id === userId);
    if (!user) return;

    // Tạo modal confirm với input cho password mới
    const newPassword = window.prompt(
      `Reset mật khẩu cho ${user.name}?\n\nNhập mật khẩu mới (để trống sẽ dùng mật khẩu mặc định "123456"):`,
      ''
    );

    // Nếu user cancel thì return
    if (newPassword === null) return;

    // Confirm reset
    const confirmMessage = newPassword.trim() 
      ? `Xác nhận reset mật khẩu cho ${user.name} thành: "${newPassword.trim()}"?`
      : `Xác nhận reset mật khẩu cho ${user.name} về mật khẩu mặc định "123456"?`;

    if (!window.confirm(confirmMessage)) return;

    try {
      setLoading(true);
      const response = await userAPI.resetPassword(userId, newPassword.trim() || undefined);
      
      if (response.status === 'success' && response.data) {
        alert(`✅ ${response.message}\n\n📧 Thông báo cho ${user.name}:\nEmail: ${user.email}\nMật khẩu mới: ${response.data.newPassword}`);
        
        // Refresh danh sách users
        await fetchUsers();
      } else {
        alert('❌ Không thể reset mật khẩu: ' + (response.message || 'Lỗi không xác định'));
      }
    } catch (error: any) {
      console.error('Error resetting password:', error);
      const errorMessage = error?.message || 'Đã xảy ra lỗi khi reset mật khẩu';
      alert('❌ Lỗi: ' + errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleSendNotification = async (userId: string) => {
    try {
      // TODO: Implement send notification API
      alert('Chức năng đang được phát triển');
    } catch (error) {
      console.error('Error sending notification:', error);
      alert('Không thể gửi thông báo');
    }
  };

  // Đóng modal và reset selectedUser
  const handleCloseModal = () => {
    setShowModal(false);
    setTimeout(() => {
      setSelectedUser(null);
    }, 100);
  };

  // Style tùy chỉnh cho menu chọn vai trò
  useEffect(() => {
    // Tạo style cho dropdown options
    const styleEl = document.createElement('style');
    styleEl.innerHTML = `
      select option {
        background-color: white;
        color: #374151; /* text-gray-700 */
        padding: 8px 12px;
      }
      select option:hover, select option:focus {
        background-color: #EFF6FF; /* bg-blue-50 */
        color: #1D4ED8; /* text-blue-700 */
      }
    `;
    document.head.appendChild(styleEl);
    
    return () => {
      document.head.removeChild(styleEl);
    };
  }, []);

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
              <h1 className="text-2xl font-bold text-white">Quản lý người dùng</h1>
            </div>
            <button
              onClick={fetchUsers}
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-700 bg-opacity-30 border border-white border-opacity-20 rounded-md hover:bg-opacity-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200"
            >
              <FiRefreshCw className="w-5 h-5 mr-2" />
              Làm mới
            </button>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white shadow-sm mt-6 rounded-lg mx-auto max-w-7xl">
        <div className="mx-auto px-4 py-5 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {/* Search */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Tìm kiếm theo tên hoặc email..."
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg leading-5 bg-white text-gray-700 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all duration-200"
              />
            </div>

            {/* Role Filter */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiShield className="h-5 w-5 text-gray-400" />
              </div>
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg leading-5 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all duration-200"
              >
                <option value="all" className="text-gray-700">Tất cả vai trò</option>
                <option value="admin" className="text-gray-700">Admin</option>
                <option value="trainer" className="text-gray-700">Huấn luyện viên</option>
                <option value="member" className="text-gray-700">Thành viên</option>
              </select>
            </div>

            {/* Status Filter */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiFilter className="h-5 w-5 text-gray-400" />
              </div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg leading-5 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all duration-200"
              >
                <option value="all" className="text-gray-700">Tất cả trạng thái</option>
                <option value="active" className="text-gray-700">Đang hoạt động</option>
                <option value="inactive" className="text-gray-700">Đã khóa</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-500"></div>
            <p className="mt-4 text-lg text-gray-600">Đang tải dữ liệu...</p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="rounded-full bg-red-100 p-3">
              <FiUser className="w-8 h-8 text-red-600" />
            </div>
            <p className="mt-4 text-lg text-red-600">{error}</p>
            <button
              onClick={fetchUsers}
              className="mt-4 inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200"
            >
              <FiRefreshCw className="w-5 h-5 mr-2" />
              Thử lại
            </button>
          </div>
        ) : (
          <>
            <div className="bg-white shadow-lg rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        <div className="flex items-center space-x-2">
                          <FiUser className="w-4 h-4" />
                          <span>Tên</span>
                        </div>
                      </th>
                      <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        <div className="flex items-center space-x-2">
                          <FiMail className="w-4 h-4" />
                          <span>Email</span>
                        </div>
                      </th>
                      <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        <div className="flex items-center space-x-2">
                          <FiShield className="w-4 h-4" />
                          <span>Vai trò</span>
                        </div>
                      </th>
                      <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        <div className="flex items-center space-x-2">
                          <FiEdit2 className="w-4 h-4" />
                          <span>Thao tác</span>
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {currentUsers.map((user) => (
                      <tr key={user.id} className="hover:bg-gray-50 transition-colors duration-150">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0">
                              <UserAvatar user={user} size="sm" />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{user.name}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">{user.email}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            user.role === 'admin' 
                              ? 'bg-purple-100 text-purple-800'
                              : user.role === 'trainer'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-green-100 text-green-800'
                          }`}>
                            {user.role === 'admin' 
                              ? 'Admin'
                              : user.role === 'trainer'
                              ? 'Huấn luyện viên'
                              : 'Thành viên'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex flex-wrap gap-2">
                            <button
                              onClick={() => {
                                console.log('Xem chi tiết user:', user);
                                console.log('Current state before update - showModal:', showModal, 'selectedUser:', selectedUser);
                                setSelectedUser(user);
                                setShowModal(true);
                                console.log('Modal should be visible now, showModal:', true, 'selectedUser:', user);
                                console.log('isBrowser:', isBrowser);
                                
                                // Force a re-render to ensure the modal shows up
                                setTimeout(() => {
                                  console.log('After timeout - showModal:', true, 'selectedUser:', user, 'isBrowser:', isBrowser);
                                }, 100);
                              }}
                              className="inline-flex items-center px-2.5 py-1.5 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all duration-200"
                            >
                              <FiEye className="w-4 h-4 mr-1" />
                              Chi tiết
                            </button>
                            
                            {user.role !== 'admin' && (
                              <>
                                {user.role === 'member' ? (
                                  <button
                                    onClick={() => handleRoleChange(user.id, 'trainer')}
                                    className="inline-flex items-center px-2.5 py-1.5 text-sm font-medium text-blue-700 bg-blue-50 rounded-md hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
                                  >
                                    <FiShield className="w-4 h-4 mr-1" />
                                    Chỉ định HLV
                                  </button>
                                ) : (
                                  <button
                                    onClick={() => handleRoleChange(user.id, 'member')}
                                    className="inline-flex items-center px-2.5 py-1.5 text-sm font-medium text-red-700 bg-red-50 rounded-md hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-200"
                                  >
                                    <FiShield className="w-4 h-4 mr-1" />
                                    Hủy HLV
                                  </button>
                                )}
                              </>
                            )}
                            
                            <button
                              onClick={() => handleToggleStatus(user.id, user.active)}
                              className={`inline-flex items-center px-2.5 py-1.5 text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200 ${
                                user.active
                                  ? 'text-red-700 bg-red-50 hover:bg-red-100 focus:ring-red-500'
                                  : 'text-green-700 bg-green-50 hover:bg-green-100 focus:ring-green-500'
                              }`}
                            >
                              {user.active ? (
                                <>
                                  <FiLock className="w-4 h-4 mr-1" />
                                  Khóa
                                </>
                              ) : (
                                <>
                                  <FiUnlock className="w-4 h-4 mr-1" />
                                  Mở khóa
                                </>
                              )}
                            </button>
                            
                            <button
                              onClick={() => handleResetPassword(user.id)}
                              className="inline-flex items-center px-2.5 py-1.5 text-sm font-medium text-yellow-700 bg-yellow-50 rounded-md hover:bg-yellow-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition-all duration-200"
                            >
                              <FiKey className="w-4 h-4 mr-1" />
                              Reset MK
                            </button>
                            
                            <button
                              onClick={() => handleSendNotification(user.id)}
                              className="inline-flex items-center px-2.5 py-1.5 text-sm font-medium text-purple-700 bg-purple-50 rounded-md hover:bg-purple-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all duration-200"
                            >
                              <FiSend className="w-4 h-4 mr-1" />
                              Thông báo
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Pagination */}
            <div className="bg-white px-4 py-4 flex items-center justify-between border-t border-gray-200 sm:px-6 mt-6 rounded-xl shadow-md">
              <div className="flex-1 flex justify-between sm:hidden">
                <button
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Trang trước
                </button>
                <button
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Trang sau
                </button>
              </div>
              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-700">
                    Hiển thị <span className="font-medium">{indexOfFirstUser + 1}</span> đến{' '}
                    <span className="font-medium">
                      {Math.min(indexOfLastUser, filteredUsers.length)}
                    </span>{' '}
                    của <span className="font-medium">{filteredUsers.length}</span> kết quả
                  </p>
                </div>
                <div>
                  <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                    <button
                      onClick={() => setCurrentPage(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <FiChevronLeft className="h-5 w-5" />
                    </button>
                    {[...Array(totalPages)].map((_, index) => (
                      <button
                        key={index + 1}
                        onClick={() => setCurrentPage(index + 1)}
                        className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium transition-colors duration-200 ${
                          currentPage === index + 1
                            ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600'
                            : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                        }`}
                      >
                        {index + 1}
                      </button>
                    ))}
                    <button
                      onClick={() => setCurrentPage(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <FiChevronRight className="h-5 w-5" />
                    </button>
                  </nav>
                </div>
              </div>
            </div>
          </>
        )}
      </main>

      {/* User Detail Modal - Using Portal */}
      {showModal && selectedUser && isBrowser && createPortal(
        <div className="fixed inset-0 z-[9999] overflow-y-auto overflow-x-hidden flex justify-center items-center">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" 
            onClick={handleCloseModal}
          ></div>
          
          {/* Modal Content */}
          <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full mx-4 z-[10000] transform transition-all">
            {/* Modal Header with gradient */}
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-4 rounded-t-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="mr-4">
                    <UserAvatar user={selectedUser} size="lg" />
                  </div>
                  <h3 className="text-xl leading-6 font-bold text-white">
                    {selectedUser.name}
                  </h3>
                </div>
                <button 
                  onClick={handleCloseModal}
                  className="bg-white/20 hover:bg-white/30 rounded-full p-2 inline-flex items-center justify-center text-white transition-colors"
                >
                  <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            
            {/* Modal Body */}
            <div className="bg-white p-6">
              <div className="grid grid-cols-1 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <p className="mt-1 text-base text-black font-semibold bg-gray-50 p-2 rounded-md overflow-x-auto break-all">{selectedUser.email}</p>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Vai trò</label>
                    <p className={`mt-1 px-3 py-1 inline-flex text-sm leading-5 font-semibold rounded-full ${
                        selectedUser.role === 'admin' 
                          ? 'bg-purple-100 text-purple-800'
                          : selectedUser.role === 'trainer'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-green-100 text-green-800'
                      }`}>
                      {selectedUser.role === 'admin' 
                        ? 'Admin'
                        : selectedUser.role === 'trainer'
                        ? 'Huấn luyện viên'
                        : 'Thành viên'}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Trạng thái</label>
                    <p className={`mt-1 px-3 py-1 inline-flex text-sm leading-5 font-semibold rounded-full ${
                        selectedUser.active 
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                      {selectedUser.active ? 'Đang hoạt động' : 'Đã khóa'}
                    </p>
                  </div>
                </div>
                
                {selectedUser.phone && (
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Số điện thoại</label>
                    <p className="mt-1 text-base text-black font-semibold bg-gray-50 p-2 rounded-md">{selectedUser.phone}</p>
                  </div>
                )}
                
                {selectedUser.dateOfBirth && (
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Ngày sinh</label>
                    <p className="mt-1 text-base text-black font-semibold bg-gray-50 p-2 rounded-md">
                      {new Date(selectedUser.dateOfBirth).toLocaleDateString('vi-VN')}
                    </p>
                  </div>
                )}
                
                {selectedUser.address && (
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Địa chỉ</label>
                    <p className="mt-1 text-base text-black font-semibold bg-gray-50 p-2 rounded-md">{selectedUser.address}</p>
                  </div>
                )}
              </div>
            </div>
            
            {/* Modal Footer */}
            <div className="bg-gray-50 px-6 py-4 rounded-b-lg flex justify-end">
              <button
                type="button"
                onClick={handleCloseModal}
                className="inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 sm:w-auto sm:text-sm"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
} 