'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { userAPI, uploadAPI } from '@/services/api';
import { motion } from 'framer-motion';
import { FiUser, FiMail, FiPhone, FiCalendar, FiMapPin, FiInfo, FiEdit, FiArrowLeft, FiSave, FiX, FiLock, FiCamera, FiUpload } from 'react-icons/fi';
import { ApiResponse } from '@/types';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  phone?: string;
  address?: string;
  dateOfBirth?: string;
  profileImage?: string;
  createdAt: string;
}

export default function TrainerProfile() {
  const { auth, refreshUserData } = useAuth();
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notification, setNotification] = useState<{type: 'success' | 'error', message: string} | null>(null);
  const [userData, setUserData] = useState<User | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    dateOfBirth: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  
  // Image upload states
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  useEffect(() => {
    if (!auth.isAuthenticated) {
      router.push('/auth/login');
      return;
    }

    if (auth.user && auth.user.role !== 'trainer') {
      router.push(`/dashboard/${auth.user.role}`);
      return;
    }

    if (auth.user) {
      const user = {
        id: auth.user.id,
        name: auth.user.name || '',
        email: auth.user.email || '',
        role: auth.user.role || 'trainer',
        phone: auth.user.phone || '',
        address: auth.user.address || '',
        dateOfBirth: auth.user.dateOfBirth ? new Date(auth.user.dateOfBirth).toISOString().split('T')[0] : '',
        profileImage: auth.user.profileImage || '',
        createdAt: auth.user.createdAt || new Date().toISOString(),
      };
      
      setUserData(user);
      setFormData({
        name: user.name,
        email: user.email,
        phone: user.phone || '',
        address: user.address || '',
        dateOfBirth: user.dateOfBirth || '',
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
    }
  }, [auth.isAuthenticated, auth.user, router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error for this field when user types
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: ''
      });
    }
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      errors.name = 'Tên là bắt buộc';
    }
    
    if (!formData.email.trim()) {
      errors.email = 'Email là bắt buộc';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email không hợp lệ';
    }
    
    if (formData.phone && !/^\d{10,11}$/.test(formData.phone.replace(/[\s-]/g, ''))) {
      errors.phone = 'Số điện thoại phải có 10-11 chữ số';
    }
    
    if (isChangingPassword) {
      if (!formData.currentPassword) {
        errors.currentPassword = 'Mật khẩu hiện tại là bắt buộc';
      }
      
      if (!formData.newPassword) {
        errors.newPassword = 'Mật khẩu mới là bắt buộc';
      } else if (formData.newPassword.length < 6) {
        errors.newPassword = 'Mật khẩu phải có ít nhất 6 ký tự';
      }
      
      if (formData.newPassword !== formData.confirmPassword) {
        errors.confirmPassword = 'Mật khẩu không khớp';
      }
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleBack = () => {
    router.push('/dashboard/trainer');
  };

  const handleStartEdit = () => {
    setIsEditing(true);
    setError(null);
    setNotification(null);
    setIsChangingPassword(false);
  };

  const handleCancelEdit = () => {
    if (userData) {
      setFormData({
        name: userData.name,
        email: userData.email,
        phone: userData.phone || '',
        address: userData.address || '',
        dateOfBirth: userData.dateOfBirth || '',
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
    }
    setIsEditing(false);
    setFormErrors({});
    setError(null);
    setNotification(null);
    setIsChangingPassword(false);
    
    // Reset image states
    setImageFile(null);
    setImagePreview(null);
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('vi-VN', options);
  };

  const handleTogglePasswordChange = () => {
    setIsChangingPassword(!isChangingPassword);
    
    // Clear password fields and errors when toggling
    setFormData({
      ...formData,
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    });
    
    setFormErrors({
      ...formErrors,
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    });
  };

  // Handle image selection
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file type
    if (!file.type.match('image.*')) {
      setError('Vui lòng chọn file hình ảnh');
      return;
    }

    // Check file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('Kích thước hình ảnh không được vượt quá 5MB');
      return;
    }

    setImageFile(file);
    
    // Create preview URL
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
    
    setError(null);
  };

  // Handle image upload
  const handleImageUpload = async (): Promise<string | null> => {
    if (!imageFile) return null;

    setIsUploadingImage(true);
    try {
      const response = await uploadAPI.uploadProfileImage(imageFile);
      if (response.status === 'success' && response.data) {
        return (response.data as unknown as { url: string }).url;
      }
      throw new Error('Không thể tải lên hình ảnh');
    } catch (err: any) {
      console.error('Error uploading image:', err);
      throw new Error(err.response?.data?.message || 'Lỗi khi tải lên hình ảnh');
    } finally {
      setIsUploadingImage(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      // Upload image first if there's a new image
      let profileImageUrl = userData?.profileImage;
      if (imageFile) {
        const uploadedImageUrl = await handleImageUpload();
        if (uploadedImageUrl) {
          profileImageUrl = uploadedImageUrl;
        }
      }

      // Update profile information
      const updateData: any = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone || null,
        address: formData.address || null,
        dateOfBirth: formData.dateOfBirth || null,
      };

      if (profileImageUrl) {
        updateData.profileImage = profileImageUrl;
      }

      const response = await userAPI.updateUser(userData!.id, updateData);
      
      if (response && response.status === 'success' && response.data && 'user' in response.data) {
        const user = response.data.user as any;
        const updatedUser = {
          ...userData!,
          name: user.name || userData!.name,
          email: user.email || userData!.email,
          phone: user.phone || userData!.phone,
          address: user.address || userData!.address,
          dateOfBirth: user.dateOfBirth || userData!.dateOfBirth,
          profileImage: user.profileImage || userData!.profileImage,
        };
        
        setUserData(updatedUser);
        
        // Refresh user data in auth context
        if (refreshUserData) {
          await refreshUserData();
        }

        // Handle password change if requested
        if (isChangingPassword && formData.currentPassword && formData.newPassword) {
          try {
            await userAPI.updatePassword(userData!.id, {
              currentPassword: formData.currentPassword,
              newPassword: formData.newPassword,
            });
            
            setNotification({ type: 'success', message: 'Cập nhật hồ sơ và mật khẩu thành công' });
          } catch (passwordError: any) {
            console.error('Error updating password:', passwordError);
            setNotification({ type: 'success', message: 'Cập nhật hồ sơ thành công' });
            setError(passwordError.response?.data?.message || 'Không thể cập nhật mật khẩu. Vui lòng thử lại.');
            return; // Don't close the form if password update failed
          }
        } else {
          setNotification({ type: 'success', message: 'Cập nhật hồ sơ thành công' });
        }
        
        setIsEditing(false);
        setIsChangingPassword(false);
        
        // Clear password fields and image states
        setFormData({
          ...formData,
          currentPassword: '',
          newPassword: '',
          confirmPassword: '',
        });
        setImageFile(null);
        setImagePreview(null);
        
        // Auto-clear notification after 3 seconds
        setTimeout(() => {
          setNotification(null);
        }, 3000);
      } else {
        throw new Error(response?.message || 'Failed to update profile');
      }
    } catch (err: any) {
      console.error('Error updating profile:', err);
      setError(err.response?.data?.message || 'Không thể cập nhật hồ sơ. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  // Get initials from user name for avatar
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();
  };

  if (!userData) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 shadow-lg">
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
              <h1 className="text-2xl font-bold text-white">Hồ sơ huấn luyện viên</h1>
            </div>
            
            {!isEditing && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleStartEdit}
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-700 bg-opacity-30 rounded-lg hover:bg-opacity-50 focus:outline-none transition-all duration-200"
              >
                <FiEdit className="w-5 h-5 mr-2" />
                Chỉnh sửa hồ sơ
              </motion.button>
            )}
          </div>
        </div>
      </div>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`${
              notification.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
            } mb-6 rounded-lg p-4 flex items-start`}
          >
            <div className="flex-shrink-0">
              {notification.type === 'success' ? (
                <FiInfo className="h-5 w-5 text-green-500" />
              ) : (
                <FiInfo className="h-5 w-5 text-red-500" />
              )}
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium">{notification.message}</p>
            </div>
          </motion.div>
        )}

        <div className="grid gap-8 grid-cols-1 lg:grid-cols-3">
          {/* Profile Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="bg-gradient-to-r from-blue-500 to-indigo-600 px-6 py-8">
                <div className="flex justify-center">
                  <div className="relative">
                    {/* Avatar or profile image */}
                    {userData.profileImage ? (
                      <img 
                        src={`http://localhost:5000${userData.profileImage}`}
                        alt={userData.name}
                        className="h-28 w-28 rounded-full object-cover border-4 border-white shadow-md"
                      />
                    ) : (
                      <div className="h-28 w-28 rounded-full bg-white flex items-center justify-center text-blue-600 text-3xl font-bold shadow-md border-4 border-white">
                        {getInitials(userData.name)}
                      </div>
                    )}
                    
                    {/* Camera icon for editing */}
                    {isEditing && (
                      <label htmlFor="profile-image" className="absolute bottom-0 right-0 bg-blue-600 text-white rounded-full p-2 cursor-pointer hover:bg-blue-700 transition-colors shadow-lg">
                        <FiCamera className="h-4 w-4" />
                        <input
                          id="profile-image"
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          className="hidden"
                        />
                      </label>
                    )}

                    {/* Image preview during editing */}
                    {imagePreview && isEditing && (
                      <div className="absolute inset-0">
                        <img 
                          src={imagePreview}
                          alt="Preview"
                          className="h-28 w-28 rounded-full object-cover border-4 border-white shadow-md"
                        />
                      </div>
                    )}

                    {/* Upload progress indicator */}
                    {isUploadingImage && (
                      <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white"></div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="p-6 text-center">
                <h2 className="text-xl font-semibold text-gray-800">{userData.name}</h2>
                <p className="text-gray-500">{userData.email}</p>
                
                <div className="mt-6 px-4 py-2 bg-blue-50 rounded-lg inline-block">
                  <span className="text-blue-700 font-medium">Huấn luyện viên</span>
                </div>
                
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <p className="text-gray-500 text-sm">
                    Tham gia từ {formatDate(userData.createdAt)}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100">
                <h2 className="text-lg font-medium text-gray-800">
                  {isEditing ? 'Chỉnh sửa thông tin hồ sơ' : 'Thông tin hồ sơ'}
                </h2>
              </div>
              
              <div className="p-6">
                {isEditing ? (
                  <form onSubmit={handleSubmit}>
                    <div className="space-y-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 flex items-center">
                          <FiUser className="mr-2 text-gray-400" /> Tên
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-gray-900 ${
                            formErrors.name ? 'border-red-500' : ''
                          }`}
                        />
                        {formErrors.name && (
                          <p className="mt-1 text-sm text-red-600">{formErrors.name}</p>
                        )}
                      </div>
                      
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 flex items-center">
                          <FiMail className="mr-2 text-gray-400" /> Email
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-gray-900 ${
                            formErrors.email ? 'border-red-500' : ''
                          }`}
                        />
                        {formErrors.email && (
                          <p className="mt-1 text-sm text-red-600">{formErrors.email}</p>
                        )}
                      </div>
                      
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 flex items-center">
                          <FiPhone className="mr-2 text-gray-400" /> Số điện thoại (tùy chọn)
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-gray-900 ${
                            formErrors.phone ? 'border-red-500' : ''
                          }`}
                          placeholder="Số điện thoại của bạn"
                        />
                        {formErrors.phone && (
                          <p className="mt-1 text-sm text-red-600">{formErrors.phone}</p>
                        )}
                      </div>
                      
                      <div>
                        <label htmlFor="address" className="block text-sm font-medium text-gray-700 flex items-center">
                          <FiMapPin className="mr-2 text-gray-400" /> Địa chỉ (tùy chọn)
                        </label>
                        <textarea
                          id="address"
                          name="address"
                          rows={3}
                          value={formData.address}
                          onChange={handleInputChange}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-gray-900"
                          placeholder="Địa chỉ của bạn"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700 flex items-center">
                          <FiCalendar className="mr-2 text-gray-400" /> Ngày sinh (tùy chọn)
                        </label>
                        <input
                          type="date"
                          id="dateOfBirth"
                          name="dateOfBirth"
                          value={formData.dateOfBirth}
                          onChange={handleInputChange}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-gray-900"
                        />
                      </div>
                      
                      {/* Password change section */}
                      <div className="pt-6 border-t border-gray-100">
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-medium text-gray-800 flex items-center">
                            <FiLock className="mr-2 text-gray-400" /> Đổi mật khẩu
                          </h3>
                          <button
                            type="button"
                            onClick={handleTogglePasswordChange}
                            className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                          >
                            {isChangingPassword ? 'Hủy đổi mật khẩu' : 'Đổi mật khẩu'}
                          </button>
                        </div>
                        
                        {isChangingPassword && (
                          <div className="mt-4 space-y-4">
                            <div>
                              <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700">
                                Mật khẩu hiện tại
                              </label>
                              <input
                                type="password"
                                id="currentPassword"
                                name="currentPassword"
                                value={formData.currentPassword}
                                onChange={handleInputChange}
                                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-gray-900 ${
                                  formErrors.currentPassword ? 'border-red-500' : ''
                                }`}
                              />
                              {formErrors.currentPassword && (
                                <p className="mt-1 text-sm text-red-600">{formErrors.currentPassword}</p>
                              )}
                            </div>
                            
                            <div>
                              <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
                                Mật khẩu mới
                              </label>
                              <input
                                type="password"
                                id="newPassword"
                                name="newPassword"
                                value={formData.newPassword}
                                onChange={handleInputChange}
                                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-gray-900 ${
                                  formErrors.newPassword ? 'border-red-500' : ''
                                }`}
                              />
                              {formErrors.newPassword && (
                                <p className="mt-1 text-sm text-red-600">{formErrors.newPassword}</p>
                              )}
                            </div>
                            
                            <div>
                              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                                Xác nhận mật khẩu mới
                              </label>
                              <input
                                type="password"
                                id="confirmPassword"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleInputChange}
                                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-gray-900 ${
                                  formErrors.confirmPassword ? 'border-red-500' : ''
                                }`}
                              />
                              {formErrors.confirmPassword && (
                                <p className="mt-1 text-sm text-red-600">{formErrors.confirmPassword}</p>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                      
                      {error && (
                        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                          {error}
                        </div>
                      )}
                      
                      <div className="flex justify-end space-x-3">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          type="button"
                          onClick={handleCancelEdit}
                          className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
                        >
                          <FiX className="mr-2 h-4 w-4" /> Hủy
                        </motion.button>
                        
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          type="submit"
                          disabled={loading}
                          className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
                        >
                          {loading ? (
                            <>
                              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              Đang lưu...
                            </>
                          ) : (
                            <>
                              <FiSave className="mr-2 h-4 w-4" /> Lưu thay đổi
                            </>
                          )}
                        </motion.button>
                      </div>
                    </div>
                  </form>
                ) : (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-500 flex items-center mb-1">
                          <FiUser className="mr-2 text-blue-500" /> Tên
                        </p>
                        <p className="text-gray-800 font-medium">{userData.name || 'Chưa cung cấp'}</p>
                      </div>
                      
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-500 flex items-center mb-1">
                          <FiMail className="mr-2 text-blue-500" /> Email
                        </p>
                        <p className="text-gray-800 font-medium">{userData.email || 'Chưa cung cấp'}</p>
                      </div>
                      
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-500 flex items-center mb-1">
                          <FiPhone className="mr-2 text-blue-500" /> Điện thoại
                        </p>
                        <p className="text-gray-800 font-medium">{userData.phone || 'Chưa cung cấp'}</p>
                      </div>
                      
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-500 flex items-center mb-1">
                          <FiCalendar className="mr-2 text-blue-500" /> Ngày sinh
                        </p>
                        <p className="text-gray-800 font-medium">
                          {userData.dateOfBirth ? formatDate(userData.dateOfBirth) : 'Chưa cung cấp'}
                        </p>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-500 flex items-center mb-1">
                        <FiMapPin className="mr-2 text-blue-500" /> Địa chỉ
                      </p>
                      <p className="text-gray-800 font-medium">{userData.address || 'Chưa cung cấp'}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
} 